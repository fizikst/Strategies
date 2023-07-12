import { CCIDynamicBotOptions } from './bot';

export const BTCUSDT: CCIDynamicBotOptions = {
    instrumentType: 'FUTURES',
    fee: 0.02,
    lotsMultiplier: 1,
    equityLevel: 0.1,
    broker: 'binance',
    ticker: 'BTCUSDT',
    currency: 'USDT',
    interval: '15min',
    amount: 500,
    orderCandlesLimit: 76,
    closeAtZero: false,
    // stopTakeRatio: 1.47,
    atrPeriod: 30,
    // atrMultiplier: 3.45,
    levelPeriod: 31,
    levelRedunant: 0.84,
    levelSampleCount: 2,
    levelSampleType: 2,
    levelMultiplier: 2.38,
    levelOffset: 0,
    cciPeriod: 35,
    // zeroClose: true,
    sandbox: true,
    cciAtr: false,
    maxRetryOrders: 3,
    reduceWhen: 1.05,
    reduceSize: 0.22,
    manual: true,
    id: 4,
    signalFilter: false,
    takeProfit: 8.74,
    stopLoss: 9.1,
    trailing: 2,
    // step: 5.66,
    // levelsCount: 4,
    // martingale: 1.76,
};

export const SBER: CCIDynamicBotOptions = {
    // instrumentType: 'SPOT',
    // fee: 0.02,
    // broker: 'tinkoff',
    // ticker: 'SBER',
    // currency: 'RUB',
    // interval: '15min',
    // amount: 10000,
    // orderCandlesLimit: 19,
    // atrPeriod: 37,
    // levelPeriod: 7,
    // levelRedunant: 0.87,
    // levelSampleCount: 1,
    // levelSampleType: 4,
    // levelMultiplier: 2.47,
    // levelOffset: 0,
    // cciPeriod: 8,
    // sandbox: true,
    // cciAtr: true,
    // id: 4,
    // signalFilter: false,
    // equityLevel: 0.1,

    instrumentType: 'SPOT',
    fee: 0.02,
    broker: 'tinkoff',
    ticker: 'SBER',
    currency: 'RUB',
    interval: '1min',
    amount: 10000,
    orderCandlesLimit: 19,
    atrPeriod: 28,
    levelPeriod: 13,
    levelRedunant: 0.87,
    levelSampleCount: 3,
    levelSampleType: 4,
    levelMultiplier: 1.85,
    levelOffset: 0,
    cciPeriod: 15,
    sandbox: true,
    cciAtr: true,
    id: 4,
    signalFilter: false,
    equityLevel: 0.1,
};

export const BNBUSDT: CCIDynamicBotOptions = {
    ticker: 'BNBUSDT',
    currency: 'USDT',
    broker: 'binance',
    interval: '15min',
    amount: 10000,
    levelOffset: 0,
    // stopTakeRatio: 1.26,
    atrPeriod: 14,
    // atrMultiplier: 1.69,
    cciPeriod: 32,
    levelPeriod: 32,
    levelSampleType: 4,
    levelRedunant: 0.45,
    levelSampleCount: 3,
    levelMultiplier: 1.05,
    cciAtr: false,
    closeAtZero: true,
    orderCandlesLimit: 11,
    // zeroClose: true,
    signalFilter: true,
    takeProfit: 2.87,
    stopLoss: 1.45,
    reduceWhen: 4.17,
    reduceSize: 0.87,
    trailing: 2,
    id: 29,
    equityLevel: 0.1,
    sandbox: true,
    // step: 5.66,
    // levelsCount: 4,
    // martingale: 1.76,
};

export const ENSUSDT: CCIDynamicBotOptions = {
    instrumentType: 'SPOT',
    ticker: 'ENSUSDT',
    currency: 'USDT',
    broker: 'binance',
    interval: '15min',
    amount: 1000,
    orderCandlesLimit: 19,
    atrPeriod: 32,
    levelPeriod: 33,
    levelRedunant: 0.98,
    levelSampleCount: 2,
    levelSampleType: 2,
    levelMultiplier: 1.32,
    levelOffset: 0,
    cciPeriod: 12,
    sandbox: true,
    cciAtr: true,
    id: 4,
    signalFilter: true,
    equityLevel: 0.1,

    // ticker: 'ENSUSDT',
    // currency: 'USDT',
    // broker: 'binance',
    // interval: '15min',
    // amount: 1000,
    // orderCandlesLimit: 19,
    // atrPeriod: 28,
    // levelPeriod: 13,
    // levelRedunant: 0.87,
    // levelSampleCount: 3,
    // levelSampleType: 4,
    // levelMultiplier: 1.85,
    // levelOffset: 0,
    // cciPeriod: 15,
    // sandbox: true,
    // cciAtr: true,
    // id: 4,
    // signalFilter: false,
    // equityLevel: 0.1

    // ticker: 'ENSUSDT',
    // currency: 'USDT',
    // broker: 'binance',
    // interval: '1min',
    // amount: 1000,
    // levelOffset: 0,
    // atrPeriod: 13,
    // cciPeriod: 21,
    // levelPeriod: 25,
    // levelSampleType: 2,
    // levelRedunant: 0.63,
    // levelSampleCount: 1,
    // levelMultiplier: 1.07,
    // cciAtr: true,
    // closeAtZero: true,
    // orderCandlesLimit: 11,
    // signalFilter: false,
    // takeProfit: 6.02,
    // stopLoss: 1.12,
    // reduceWhen: 3.77,
    // reduceSize: 0.42,
    // trailing: 3,
    // equityLevel: 0.1,
    // sandbox: true,
    // id: 4,
    // reinvest: true,
};
export const CRVUSDT: CCIDynamicBotOptions = {
    ticker: 'CRVUSDT',
    currency: 'USDT',
    broker: 'binance',
    interval: '15min',
    amount: 1000,
    levelOffset: 0,
    // stopTakeRatio: 3.34,
    atrPeriod: 12,
    // atrMultiplier: 3.76,
    cciPeriod: 12,
    levelPeriod: 18,
    levelSampleType: 4,
    levelRedunant: 0.89,
    levelSampleCount: 4,
    levelMultiplier: 1.51,
    cciAtr: true,
    closeAtZero: false,
    orderCandlesLimit: 83,
    // zeroClose: false,
    signalFilter: true,
    takeProfit: 1.96,
    stopLoss: 9.22,
    reduceWhen: 4.83,
    reduceSize: 0.43,
    trailing: 0,
    sandbox: true,
    id: 29,
    // step: 5.66,
    // levelsCount: 4,
    // martingale: 1.76,
};
