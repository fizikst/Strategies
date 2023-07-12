import { ATR, CCI, EMA, LWMA, SMA, UniLevel, WEMA } from '@debut/indicators';
import { SessionPluginOptions, sessionPlugin } from '@debut/plugin-session';
import { OrderExpireOptions, orderExpirePlugin } from '@debut/plugin-order-expire';
import { reinvestPlugin } from '@debut/plugin-reinvest';
import { reportToTelegramPlugin, ReportToTelegramOptions } from '@debut/plugin-report-to-telegram';
import { ReportPluginAPI, IndicatorsSchema } from '@debut/plugin-report';
import { statsPlugin, StatsPluginAPI } from '@debut/plugin-stats';
import { ShutdownPluginAPI } from '@debut/plugin-genetic-shutdown';
import { Debut } from '@debut/community-core';
import { DebutOptions, BaseTransport, OrderType, Candle } from '@debut/types';
import { orders, cli } from '@debut/plugin-utils';
import { VirtualTakesOptions, virtualTakesPlugin, VirtualTakesPluginAPI } from '@debut/plugin-virtual-takes';
// import { gridPlugin, GridPluginOptions, Grid, GridPluginAPI } from '@debut/plugin-grid';

const { telegramBotToken, telegramChannelId } = cli.getTokens();

export interface CCIDynamicBotOptions
    extends SessionPluginOptions,
        VirtualTakesOptions,
        OrderExpireOptions,
        // GridPluginOptions,
        DebutOptions {
    atrPeriod: number;
    cciPeriod: number;
    // stopTakeRatio: number;
    levelPeriod: number;
    levelRedunant: number;
    levelSampleCount: number; // 1 - 3
    levelSampleType: number; // 1 - 3
    levelMultiplier: number;
    levelOffset: number;
    // zeroClose: boolean;
    // atrMultiplier: number;
    cciAtr: boolean;
    reinvest?: boolean;
    signalFilter?: boolean;
    strictLevel?: boolean;
    // takeProfit: number;
}

export class CCIDynamicGrid extends Debut {
    declare opts: CCIDynamicBotOptions;
    declare plugins: StatsPluginAPI & ReportPluginAPI & ShutdownPluginAPI & VirtualTakesPluginAPI; // & GridPluginAPI;
    private cci: CCI;
    private levels: UniLevel<typeof SMA | typeof EMA | typeof WEMA | typeof LWMA>;
    private atr: ATR;
    private cciValue: number;
    private atrValue: number;
    private upperLevel: number;
    private lowerLevel: number;
    private cciValues: number[] = [];
    private insideNormal = false;
    private barsFromLastSignal = 0;
    // private grid: Grid;

    constructor(transport: BaseTransport, opts: CCIDynamicBotOptions) {
        super(transport, opts);

        this.registerPlugins([
            // this.opts.from && this.opts.to && sessionPlugin(this.opts),
            this.opts.reinvest ? reinvestPlugin() : null,
            // virtualTakesPlugin(this.opts),
            statsPlugin(this.opts),
            // orderExpirePlugin(this.opts),
            // gridPlugin(this.opts),
            reportToTelegramPlugin({
                botToken: telegramBotToken,
                chatId: telegramChannelId,
            }),
        ]);

        this.atr = new ATR(this.opts.atrPeriod);
        this.levels = new UniLevel(
            this.opts.levelRedunant,
            this.getSamplerType(this.opts.levelSampleType),
            this.opts.levelSampleCount,
            this.opts.levelMultiplier,
            this.opts.levelOffset,
        );
        this.cci = new CCI(this.opts.cciPeriod);
        this.levels.create(this.opts.levelPeriod);
    }

    async onDispose() {
        // console.log('444444444444')
    }

    public getSamplerType(levelType: number) {
        switch (levelType) {
            case 1:
                return WEMA;
            case 2:
                return SMA;
            case 3:
                return EMA;
            case 4:
                return LWMA;
        }
    }

    public getIndicators = (): IndicatorsSchema => {
        const schema: IndicatorsSchema = [
            // {
            //     name: 'grid',
            //     figures: [],
            //     inChart: true,
            // },
            {
                name: 'cci',
                figures: [
                    {
                        name: 'cci',
                        getValue: () => {
                            return this.cciValue;
                        },
                    },
                    {
                        name: 'overbought',
                        getValue: () => {
                            return this.upperLevel;
                        },
                    },
                    {
                        name: 'oversold',
                        getValue: () => {
                            return this.lowerLevel;
                        },
                    },
                ],
                levels: [],
                inChart: true,
            },
        ];
        // for (let i = 0; i < this.opts.levelsCount; i++) {
        //     schema[0].figures.push({
        //         name: `uplevel-${i}`,
        //         getValue: () => {
        //             return this.grid?.upLevels[i]?.price;
        //         },
        //     });

        //     schema[0].figures.push({
        //         name: `lowlevel-${i}`,
        //         getValue: () => {
        //             return this.grid?.lowLevels[i]?.price;
        //         },
        //     });
        // }

        return schema;
    };

    async openMonitoring(c: number) {
        const first = this.cciValues[2];
        const second = this.cciValues[1];

        let target: OrderType;
        const overbought = (!this.opts.strictLevel || second < this.upperLevel) && first >= this.upperLevel;
        const oversold = (!this.opts.signalFilter || second > this.lowerLevel) && first <= this.lowerLevel;
        const currentOrder = this.orders[0];
        const isZeroLevel = first * second < 0;

        if (overbought) {
            // перекуплен
            target = OrderType.SELL;
        } else if (oversold) {
            // перепродан
            target = OrderType.BUY;
        }

        // DOGE loogs good with 3
        if (this.opts.signalFilter && target && this.barsFromLastSignal < 5) {
            return;
        }

        // if (currentOrder && ((target && currentOrder.type !== target) || (this.opts.closeAtZero && isZeroLevel))) {
        // await this.closeAll();
        // }

        let deltaPrice = Infinity;
        if (this.orders?.length > 0) {
            let sum = 0;
            let lots = 0;
            let koef = this.orders.length / 100;
            if (this.orders.length > 5) {
                koef = (this.orders.length - 4) / 10;
            }

            for (let i = 0; i < this.orders.length; i++) {
                const rdr = this.orders[i];
                sum += rdr.price * rdr.lots;
                lots += rdr.lots;
            }

            deltaPrice = sum / lots - (koef * sum) / lots;
        }

        if (target === OrderType.BUY) {
            if (this.orders?.length < 10) {
                if (c <= deltaPrice) {
                    await this.placeOrder(c, target);
                }
            }
        }
    }

    async onCandle(can: Candle) {
        const { h, l, c } = can;
        // this.grid = this.plugins.grid.getGrid();
        // console.log(can);
        this.atrValue = this.atr.nextValue(h, l, c);
        this.cciValue = this.cci.nextValue(h, l, c);

        if (this.cciValue === undefined) {
            return;
        }

        if (this.opts.cciAtr) {
            this.cciValue = this.cciValue / this.atrValue;
        }
        this.barsFromLastSignal++;

        if (this.cciValues.length === 3) {
            this.cciValues.shift();
        }

        this.cciValues.push(this.cciValue);

        const first = this.cciValues[0];
        const second = this.cciValues[1];
        const third = this.cciValues[2];

        [this.upperLevel, this.lowerLevel] = this.levels.nextValue(this.cciValue);

        if (this.ordersCount > 0 && second * third < 0) {
            const profit = orders.getCurrencyBatchProfit(this.orders, c);

            if (profit / (this.opts.amount * this.opts.equityLevel) > 0.002) {
                // console.log()
                await this.closeAll();
            }
        }

        this.insideNormal =
            this.insideNormal ||
            (first < this.lowerLevel && second > this.lowerLevel) ||
            (first > this.upperLevel && second < this.upperLevel) ||
            (first > 0 && second < 0) ||
            (first < 0 && second > 0);

        if (!this.upperLevel || !this.lowerLevel || !this.insideNormal || !this.atrValue) {
            return;
        }

        await this.openMonitoring(c);
    }

    private async placeOrder(c: number, target: OrderType) {
        // console.log()
        const order = await this.createOrder(target);
        // let take = 0;
        // let stop = 0;

        // if (this.opts.manual) {
        //     if (target === OrderType.BUY) {
        //         take = c + this.atrValue * this.opts.atrMultiplier;
        //         stop = c - this.atrValue * (this.opts.atrMultiplier / this.opts.stopTakeRatio);
        //     } else {
        //         take = c - this.atrValue * this.opts.atrMultiplier;
        //         stop = c + this.atrValue * (this.opts.atrMultiplier / this.opts.stopTakeRatio);
        //     }

        //     this.plugins.takes.setPricesForOrder(order.cid, take, stop);
        // }

        // this.insideNormal = false;
        return order;
    }
}
