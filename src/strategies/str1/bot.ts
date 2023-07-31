//
// MACD
// RSI  индекс относительной силы (перепродано перекуплено)
// MA  скользящие средние

import { SessionPluginOptions, sessionPlugin } from '@debut/plugin-session';
import { ReportPluginAPI, IndicatorsSchema, FigureType } from '@debut/plugin-report';
import { statsPlugin, StatsPluginAPI } from '@debut/plugin-stats';
import { ShutdownPluginAPI } from '@debut/plugin-genetic-shutdown';
import { Debut } from '@debut/community-core';
import { DebutOptions, BaseTransport, Candle, OrderType } from '@debut/types';

import { RSI, SMA } from '@debut/indicators';
import { LargeNumberLike } from 'crypto';

export interface str1Options extends DebutOptions, SessionPluginOptions {
    // MA
    shortPeriod: number;
    longPeriod: number;
    // RSI
    rsiPeriod: number;
    rsiOversold: number;
    rsiOverbought: number;

    // S&R
    sr_sell: number;
    sr_buy: number;
}

export class str1 extends Debut {
    declare opts: str1Options;
    declare plugins: StatsPluginAPI & ReportPluginAPI & ShutdownPluginAPI;

    private smaShort: SMA;
    private smaLong: SMA;
    private smaShortValue: number;
    private smaLongValue: number;

    private rsi: RSI;
    private rsiValue: number;

    private SR: number;

    constructor(transport: BaseTransport, opts: str1Options) {
        super(transport, opts);

        this.smaShort = new SMA(this.opts.shortPeriod);
        this.smaLong = new SMA(this.opts.longPeriod);

        this.rsi = new RSI(this.opts.rsiPeriod);

        this.registerPlugins([this.opts.from && this.opts.to && sessionPlugin(this.opts), statsPlugin(this.opts)]);
    }

    public getIndicators = (): IndicatorsSchema => {
        return [
            {
                name: 'figure',
                figures: [
                    {
                        name: 'short',
                        getValue: () => {
                            return this.smaShortValue;
                        },
                    },
                    {
                        name: 'long',
                        getValue: () => {
                            return this.smaLongValue;
                        },
                    },
                ],
                inChart: true,
            },
            // {
            //     name: 'figure',
            //     figures: [
            //         {
            //             name: 'Overbought',
            //             type: FigureType.dot,
            //             getValue: () => {
            //                 return 70;
            //             },
            //         },
            //     ],
            //     inChart: true,
            // },
            // {
            //     name: 'figure',
            //     figures: [
            //         {
            //             name: 'Oversold',
            //             type: FigureType.dot,
            //             getValue: () => {
            //                 return 30;
            //             },
            //         },
            //     ],
            //     inChart: true,
            // },
        ];
    };

    async onCandle(candle: Candle) {
        this.smaShortValue = this.smaShort.nextValue(candle.c);
        this.smaLongValue = this.smaLong.nextValue(candle.c);

        this.rsiValue = this.rsi.nextValue(candle.c);

        this.SR = (candle.c / 10 ** Math.floor(Math.log10(candle.c))) % 2;

        const start = Math.max(this.opts.longPeriod, this.opts.rsiPeriod);
        const MACDSignal = 2 * +(this.smaShortValue > this.smaLongValue) - 1;

        const RSISignal = 1 * +(this.rsiValue < this.opts.rsiOversold) - 1 * +(this.rsiValue > this.opts.rsiOverbought);
        const SRSignal = 1 * +(this.SR < this.opts.sr_buy) - 1 * +(this.SR > this.opts.sr_sell);

        // console.log(MACDSignal, RSISignal, SRSignal)
        if (
            RSISignal === 1 &&
            // MACDSignal === 1 && RSISignal===1 && SRSignal === 1
            // ((MACDSignal === 1 && RSISignal === 1) ||
            //     (MACDSignal === 1 && SRSignal === 1) ||
            //     (RSISignal === 1 && SRSignal === 1)) &&
            !this.orders.length
        ) {
            await this.createOrder(OrderType.BUY);
            // buy
        } else if (
            RSISignal === 0 &&
            this.orders.length
            // MACDSignal === 0 && RSISignal===0 && SRSignal === 0
            // (MACDSignal === 0 && RSISignal === 0) ||
            // (MACDSignal === 0 && SRSignal === 0) ||
            // (RSISignal === 0 && SRSignal === 0)
        ) {
            await this.closeAll();
            // cach
        }

        // console.log(this.rsiValue, this.SR, {start, MACDSignal,RSISignal,SRSignal})
    }

    async onTick(tick: Candle) {}
}
