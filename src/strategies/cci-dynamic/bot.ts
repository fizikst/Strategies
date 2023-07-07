import { ATR, CCI, EMA, LWMA, SMA, UniLevel, WEMA } from '@debut/indicators';
import { SessionPluginOptions, sessionPlugin } from '@debut/plugin-session';
import { OrderExpireOptions, orderExpirePlugin } from '@debut/plugin-order-expire';
import { reinvestPlugin } from '@debut/plugin-reinvest';
import { ReportPluginAPI, IndicatorsSchema } from '@debut/plugin-report';
import { statsPlugin, StatsPluginAPI } from '@debut/plugin-stats';
import { ShutdownPluginAPI } from '@debut/plugin-genetic-shutdown';
import { Debut } from '@debut/community-core';
import { DebutOptions, BaseTransport, OrderType, Candle } from '@debut/types';
import { orders } from '@debut/plugin-utils';
import { VirtualTakesOptions, virtualTakesPlugin, VirtualTakesPluginAPI } from '@debut/plugin-virtual-takes';

import fs from 'fs';
import path from 'path';

export interface CCIDynamicBotOptions
    extends SessionPluginOptions,
        VirtualTakesOptions,
        OrderExpireOptions,
        DebutOptions {
    atrPeriod: number;
    cciPeriod: number;
    stopTakeRatio: number;
    levelPeriod: number;
    levelRedunant: number;
    levelSampleCount: number; // 1 - 3
    levelSampleType: number; // 1 - 3
    levelMultiplier: number;
    levelOffset: number;
    zeroClose: boolean;
    atrMultiplier: number;
    cciAtr: boolean;
    reinvest?: boolean;
    signalFilter?: boolean;
    strictLevel?: boolean;
}

export class CCIDynamic extends Debut {
    declare opts: CCIDynamicBotOptions;
    declare plugins: StatsPluginAPI & ReportPluginAPI & ShutdownPluginAPI & VirtualTakesPluginAPI;
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
    private writeStream: fs.WriteStream;
    // private writeLog: (msg:string) => void;

    constructor(transport: BaseTransport, opts: CCIDynamicBotOptions) {
        super(transport, opts);

        this.registerPlugins([
            this.opts.from && this.opts.to && sessionPlugin(this.opts),
            this.opts.reinvest ? reinvestPlugin() : null,
            virtualTakesPlugin(this.opts),
            statsPlugin(this.opts),
            orderExpirePlugin(this.opts),
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

        // Путь к файлу относительно корня проекта
        const filePath = path.join(__dirname, 'orders.log');

        // Проверка существования файла
        if (!fs.existsSync(filePath)) {
            try {
                // Создаем файл
                fs.writeFileSync(filePath, '');
                console.log('Файл успешно создан.');
            } catch (err) {
                console.error('Ошибка при создании файла:', err);
            }
        }

        // Создаем поток для записи данных в файл
        this.writeStream = fs.createWriteStream(filePath, { flags: 'a' }); // Флаг 'a' означает дозапись (append)
    }

    writeLog(message: string) {
        this.writeStream.write(`${message}\n`);
    }

    async onDispose() {
        this.writeStream.end();
    }

    async afterCloseOrder(c: number) {
        const fromOrder = this.orders[0];
        const order = await this.closeAll();
        const buy = String(order[0].openId)?.split('-');
        const sell = String(order[0].orderId)?.split('-');

        const profit = orders.getCurrencyProfit(fromOrder, +sell[2]);
        this.writeLog(
            `profit: ${profit}\nbuy: ${buy[2]} (${buy[1]})\nsell: ${sell[2]}\nbalance:${this.opts.amount}\n\n`,
        );
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
        return [
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
    };

    async openMonitoring(c: number) {
        let order = null;
        let profit = null;
        const first = this.cciValues[2];
        const second = this.cciValues[1];

        let target: OrderType;
        const overbought = (!this.opts.strictLevel || second < this.upperLevel) && first >= this.upperLevel;
        const oversold = (!this.opts.signalFilter || second > this.lowerLevel) && first <= this.lowerLevel;
        const currentOrder = this.orders[0];
        const isZeroLevel = first * second < 0;

        if (overbought) {
            target = OrderType.SELL;
        } else if (oversold) {
            target = OrderType.BUY;
        }

        // DOGE loogs good with 3
        if (this.opts.signalFilter && target && this.barsFromLastSignal < 5) {
            return;
        }

        if (currentOrder && ((target && currentOrder.type !== target) || (this.opts.closeAtZero && isZeroLevel))) {
            await this.afterCloseOrder(currentOrder.price);
        }

        if (target && !this.ordersCount) {
            await this.placeOrder(c, target);
        }
    }

    async onCandle(can: Candle) {
        const { h, l, c } = can;
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

        // if (this.ordersCount > 0) {
        //     const profit = orders.getCurrencyProfit(this.orders[0], c);
        //     if (profit < -50) {
        //         await this.closeAll();
        //         return
        //     }
        // }

        if (this.ordersCount > 0 && second * third < 0) {
            const profit = orders.getCurrencyProfit(this.orders[0], c);

            if (profit / (this.opts.amount * this.opts.equityLevel) > 0.002) {
                await this.afterCloseOrder(c);
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
        const order = await this.createOrder(target);
        let take = 0;
        let stop = 0;
        const dt = `${new Date(order.time).getHours()}:${new Date(order.time).getMinutes()}`;

        if (this.opts.manual) {
            if (target === OrderType.BUY) {
                take = c + this.atrValue * this.opts.atrMultiplier;
                stop = c - this.atrValue * (this.opts.atrMultiplier / this.opts.stopTakeRatio);
            } else {
                take = c - this.atrValue * this.opts.atrMultiplier;
                stop = c + this.atrValue * (this.opts.atrMultiplier / this.opts.stopTakeRatio);
            }

            this.plugins.takes.setPricesForOrder(order.cid, take, stop);
        }

        this.insideNormal = false;
        return order;
    }
}
