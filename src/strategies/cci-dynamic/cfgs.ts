import { CCIDynamicBotOptions } from './bot';

export const SBER: CCIDynamicBotOptions = {
    instrumentType: 'SPOT',
    fee: 0.02,
    lotsMultiplier: 1,
    equityLevel: 1,
    broker: 'tinkoff',
    ticker: 'SBER',
    currency: 'RUB',
    interval: '15min',
    amount: 1000,
    maxRetryOrders: 0,
    orderCandlesLimit: 19,
    closeAtZero: false,
    stopTakeRatio: 3.28,
    atrPeriod: 37,
    atrMultiplier: 5.09,
    levelPeriod: 7,
    levelRedunant: 0.87,
    levelSampleCount: 1,
    levelSampleType: 4,
    levelMultiplier: 2.47,
    levelOffset: 0,
    cciPeriod: 8,
    zeroClose: false,
    sandbox: true,
    cciAtr: true,
    id: 4,
    signalFilter: false,
    takeProfit: 4.21,
    stopLoss: 7.08,
    reduceWhen: 1.07,
    reduceSize: 0.23,
    trailing: 0,
};

export const XLMUSDT: CCIDynamicBotOptions = {
    ticker: 'XLMUSDT',
    currency: 'USDT',
    broker: 'binance',
    interval: '15min',
    instrumentType: 'SPOT',
    amount: 1000,
    levelOffset: 0,
    stopTakeRatio: 1.59,
    atrPeriod: 11,
    atrMultiplier: 7.56,
    cciPeriod: 24,
    levelPeriod: 10,
    levelSampleType: 4,
    levelRedunant: 0.39,
    levelSampleCount: 1,
    levelMultiplier: 1.37,
    cciAtr: false,
    closeAtZero: true,
    orderCandlesLimit: 36,
    zeroClose: false,
    signalFilter: true,
    takeProfit: 6.86,
    manual: true,
    stopLoss: 9.54,
    reduceWhen: 4.87,
    reduceSize: 0.21,
    trailing: 0,
    sandbox: true,
    id: 29,
    reinvest: true,
};
// 1112
export const ADAUSDT: CCIDynamicBotOptions = {
    ticker: 'ADAUSDT',
    instrumentType: 'SPOT',
    currency: 'USDT',
    broker: 'binance',
    interval: '15min',
    amount: 1000,
    levelOffset: 0,
    stopTakeRatio: 1.12,
    atrPeriod: 19,
    atrMultiplier: 9.59,
    cciPeriod: 30,
    levelPeriod: 28,
    levelSampleType: 3,
    levelRedunant: 0.72,
    levelSampleCount: 2,
    levelMultiplier: 1.31,
    cciAtr: true,
    closeAtZero: true,
    orderCandlesLimit: 19,
    zeroClose: true,
    signalFilter: false,
    takeProfit: 4.37,
    manual: true,
    stopLoss: 3.31,
    reduceWhen: 4.48,
    reduceSize: 0.82,
    trailing: 0,
    sandbox: true,
    id: 29,
    reinvest: true,
};
//1212
export const BTCUSDT: CCIDynamicBotOptions = {
    ticker: 'BTCUSDT',
    instrumentType: 'SPOT',
    currency: 'USDT',
    broker: 'binance',
    interval: '15min',
    amount: 1000,
    levelOffset: 0,
    stopTakeRatio: 1.68,
    atrPeriod: 31,
    atrMultiplier: 9.22,
    cciPeriod: 8,
    levelPeriod: 7,
    levelSampleType: 2,
    levelRedunant: 0.83,
    levelSampleCount: 1,
    levelMultiplier: 1.03,
    cciAtr: true,
    closeAtZero: false,
    orderCandlesLimit: 13,
    zeroClose: true,
    signalFilter: true,
    takeProfit: 5.18,
    manual: true,
    stopLoss: 9.52,
    reduceWhen: 3.99,
    reduceSize: 0.87,
    trailing: 3,
    sandbox: true,
    id: 29,
    reinvest: true,
};
// 1125
export const BNBUSDT: CCIDynamicBotOptions = {
    ticker: 'BNBUSDT',
    instrumentType: 'SPOT',
    currency: 'USDT',
    broker: 'binance',
    interval: '15min',
    amount: 1000,
    levelOffset: 0,
    stopTakeRatio: 2.47,
    atrPeriod: 28,
    atrMultiplier: 5.86,
    cciPeriod: 9,
    levelPeriod: 45,
    levelSampleType: 1,
    levelRedunant: 0.34,
    levelSampleCount: 3,
    levelMultiplier: 2.26,
    cciAtr: true,
    closeAtZero: false,
    orderCandlesLimit: 60,
    zeroClose: true,
    signalFilter: true,
    takeProfit: 1.98,
    manual: true,
    stopLoss: 8.37,
    reduceWhen: 1.32,
    reduceSize: 0.25,
    trailing: 3,
    sandbox: true,
    id: 29,
    reinvest: true,
};

export const ENSUSDT: CCIDynamicBotOptions = {
    ticker: 'ENSUSDT',
    instrumentType: 'SPOT',
    currency: 'USDT',
    broker: 'binance',
    interval: '15min',
    amount: 1000,
    levelOffset: 0,
    stopTakeRatio: 1.78,
    atrPeriod: 36,
    atrMultiplier: 2.18,
    cciPeriod: 16,
    levelPeriod: 24,
    levelSampleType: 3,
    levelRedunant: 0.41,
    levelSampleCount: 1,
    levelMultiplier: 2.14,
    cciAtr: false,
    closeAtZero: true,
    orderCandlesLimit: 21,
    zeroClose: false,
    signalFilter: true,
    takeProfit: 1.57,
    manual: false,
    stopLoss: 9.72,
    reduceWhen: 2.39,
    reduceSize: 0.22,
    trailing: 3,
    sandbox: true,
    id: 29,
    reinvest: true,
};
export const CRVUSDT: CCIDynamicBotOptions = {
    ticker: 'CRVUSDT',
    currency: 'USDT',
    broker: 'binance',
    interval: '15min',
    instrumentType: 'SPOT',
    amount: 1000,
    levelOffset: 0,
    stopTakeRatio: 1.43,
    atrPeriod: 23,
    atrMultiplier: 9.85,
    cciPeriod: 14,
    levelPeriod: 34,
    levelSampleType: 1,
    levelRedunant: 0.39,
    levelSampleCount: 2,
    levelMultiplier: 1.65,
    cciAtr: true,
    closeAtZero: false,
    orderCandlesLimit: 48,
    zeroClose: true,
    signalFilter: false,
    takeProfit: 1.07,
    manual: true,
    stopLoss: 2.14,
    reduceWhen: 2.55,
    reduceSize: 0.22,
    trailing: 1,
    sandbox: true,
    id: 4,
    reinvest: true,
};
//1  1290
export const EOSUSDT: CCIDynamicBotOptions = {
    ticker: 'EOSUSDT',
    instrumentType: 'SPOT',
    currency: 'USDT',
    broker: 'binance',
    interval: '15min',
    amount: 1000,
    levelOffset: 0,
    stopTakeRatio: 3.13,
    atrPeriod: 38,
    atrMultiplier: 3.23,
    cciPeriod: 9,
    levelPeriod: 5,
    levelSampleType: 2,
    levelRedunant: 0.57,
    levelSampleCount: 4,
    levelMultiplier: 1.17,
    cciAtr: true,
    closeAtZero: true,
    orderCandlesLimit: 88,
    zeroClose: false,
    signalFilter: true,
    takeProfit: 8.93,
    manual: true,
    stopLoss: 6.55,
    reduceWhen: 1.39,
    reduceSize: 0.2,
    trailing: 1,
    sandbox: true,
    id: 29,
    reinvest: true,
};
// 0 1305
export const ETCUSDT: CCIDynamicBotOptions = {
    ticker: 'ETCUSDT',
    instrumentType: 'SPOT',
    currency: 'USDT',
    broker: 'binance',
    interval: '15min',
    amount: 1000,
    levelOffset: 0,
    stopTakeRatio: 2.46,
    atrPeriod: 36,
    atrMultiplier: 8.92,
    cciPeriod: 11,
    levelPeriod: 5,
    levelSampleType: 4,
    levelRedunant: 0.73,
    levelSampleCount: 3,
    levelMultiplier: 1.5,
    cciAtr: false,
    closeAtZero: true,
    orderCandlesLimit: 44,
    zeroClose: false,
    signalFilter: true,
    takeProfit: 8.11,
    manual: true,
    stopLoss: 5.88,
    reduceWhen: 4.76,
    reduceSize: 0.47,
    trailing: 0,
    sandbox: true,
    id: 29,
    reinvest: true,
};
// 1031
export const ETHUSDT: CCIDynamicBotOptions = {
    ticker: 'ETHUSDT',
    instrumentType: 'SPOT',
    currency: 'USDT',
    broker: 'binance',
    interval: '15min',
    amount: 1000,
    levelOffset: 0,
    stopTakeRatio: 2.81,
    atrPeriod: 39,
    atrMultiplier: 1.49,
    cciPeriod: 36,
    levelPeriod: 22,
    levelSampleType: 2,
    levelRedunant: 0.41,
    levelSampleCount: 2,
    levelMultiplier: 1.06,
    cciAtr: false,
    closeAtZero: false,
    orderCandlesLimit: 25,
    zeroClose: false,
    signalFilter: false,
    takeProfit: 6.91,
    manual: true,
    stopLoss: 4.86,
    reduceWhen: 4.75,
    reduceSize: 0.79,
    trailing: 3,
    sandbox: true,
    id: 29,
    reinvest: true,
};
// -1 1632
export const LINKUSDT: CCIDynamicBotOptions = {
    ticker: 'LINKUSDT',
    instrumentType: 'SPOT',
    currency: 'USDT',
    broker: 'binance',
    interval: '15min',
    amount: 1000,
    levelOffset: 0,
    stopTakeRatio: 1.35,
    atrPeriod: 34,
    atrMultiplier: 3.12,
    cciPeriod: 14,
    levelPeriod: 37,
    levelSampleType: 1,
    levelRedunant: 0.89,
    levelSampleCount: 3,
    levelMultiplier: 1.89,
    cciAtr: true,
    closeAtZero: false,
    orderCandlesLimit: 13,
    zeroClose: true,
    signalFilter: false,
    takeProfit: 3.15,
    manual: false,
    stopLoss: 3.8,
    reduceWhen: 1.23,
    reduceSize: 0.23,
    trailing: 0,
    sandbox: true,
    id: 29,
    reinvest: true,
};
// 1114
export const ONTUSDT: CCIDynamicBotOptions = {
    ticker: 'ONTUSDT',
    instrumentType: 'SPOT',
    currency: 'USDT',
    broker: 'binance',
    interval: '15min',
    amount: 1000,
    levelOffset: 0,
    stopTakeRatio: 2.69,
    atrPeriod: 8,
    atrMultiplier: 0.58,
    cciPeriod: 9,
    levelPeriod: 28,
    levelSampleType: 2,
    levelRedunant: 0.9,
    levelSampleCount: 1,
    levelMultiplier: 1.03,
    cciAtr: false,
    closeAtZero: false,
    orderCandlesLimit: 55,
    zeroClose: true,
    signalFilter: false,
    takeProfit: 6.89,
    manual: true,
    stopLoss: 1.55,
    reduceWhen: 2.73,
    reduceSize: 0.24,
    trailing: 1,
    sandbox: true,
    id: 29,
    reinvest: true,
};
// 1009
export const TRXUSDT: CCIDynamicBotOptions = {
    ticker: 'TRXUSDT',
    instrumentType: 'SPOT',
    currency: 'USDT',
    broker: 'binance',
    interval: '15min',
    amount: 1000,
    levelOffset: 0,
    stopTakeRatio: 2.66,
    atrPeriod: 23,
    atrMultiplier: 1.98,
    cciPeriod: 29,
    levelPeriod: 35,
    levelSampleType: 1,
    levelRedunant: 0.75,
    levelSampleCount: 1,
    levelMultiplier: 1.33,
    cciAtr: true,
    closeAtZero: false,
    orderCandlesLimit: 31,
    zeroClose: true,
    signalFilter: false,
    takeProfit: 8.25,
    manual: true,
    stopLoss: 5.22,
    reduceWhen: 4.2,
    reduceSize: 0.75,
    trailing: 3,
    sandbox: true,
    id: 29,
    reinvest: true,
};
// 1219
export const XRPUSDT: CCIDynamicBotOptions = {
    ticker: 'XRPUSDT',
    instrumentType: 'SPOT',
    currency: 'USDT',
    broker: 'binance',
    interval: '15min',
    amount: 1000,
    levelOffset: 0,
    stopTakeRatio: 1.35,
    atrPeriod: 14,
    atrMultiplier: 7.95,
    cciPeriod: 8,
    levelPeriod: 37,
    levelSampleType: 2,
    levelRedunant: 0.25,
    levelSampleCount: 2,
    levelMultiplier: 1.24,
    cciAtr: false,
    closeAtZero: true,
    orderCandlesLimit: 15,
    zeroClose: false,
    signalFilter: true,
    takeProfit: 9.67,
    manual: true,
    stopLoss: 9.66,
    reduceWhen: 4.02,
    reduceSize: 0.45,
    trailing: 0,
    sandbox: true,
    id: 29,
    reinvest: true,
};
