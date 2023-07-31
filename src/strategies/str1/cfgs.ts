import { str1Options } from './bot';

export const TSLA: str1Options = {
    instrumentType: 'MARGIN',
    broker: 'tinkoff',
    ticker: 'TSLA',
    currency: 'USD',
    interval: '15min',
    amount: 500,
    fee: 0.1,

    shortPeriod: 5,
    longPeriod: 12,

    rsiPeriod: 28,
    rsiOversold: 30,
    rsiOverbought: 70,

    sr_sell: 0.7,
    sr_buy: 0.3,
};

export const ENSUSDT: str1Options = {
    instrumentType: 'SPOT',
    broker: 'binance',
    ticker: 'ENSUSDT',
    currency: 'USDT',
    interval: '15min',
    amount: 1000,
    // fee: 0.1,

    // shortPeriod: 5,
    // longPeriod: 12,
    // rsiPeriod: 14,
    // rsiOversold: 30,
    // rsiOverbought: 70,
    // sr_sell: 0.7,
    // sr_buy: 0.3,

    fee: 0.1,
    shortPeriod: 5,
    longPeriod: 12,
    rsiPeriod: 17,
    rsiOversold: 30,
    rsiOverbought: 70,
    sr_sell: 0.7,
    sr_buy: 0.3,
    id: 4,

    // shortPeriod: 3,
    // longPeriod: 12,

    // rsiPeriod: 14,
    // rsiOversold: 30,
    // rsiOverbought: 70,

    // sr_sell: 0.7,
    // sr_buy: 0.3,
};
