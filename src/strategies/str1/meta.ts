import { geneticShutdownPlugin } from '@debut/plugin-genetic-shutdown';
import { reportPlugin } from '@debut/plugin-report';
import { debugPlugin } from '@debut/plugin-debug';
import { createSessionValidator } from '@debut/plugin-session';
import { str1, str1Options } from './bot';
import { BaseTransport, DebutMeta, GeneticSchema, WorkingEnv } from '@debut/types';

export const parameters: GeneticSchema<str1Options> = {
    // shortPeriod: { min: 5, max: 50, int: true },
    // longPeriod: { min: 100, max: 200, int: true },

    rsiPeriod: { min: 10, max: 100, int: true },
    rsiOversold: { min: 15, max: 30, int: true },
    rsiOverbought: { min: 70, max: 100, int: true },

    // sr_sell: { min: 0.5, max: 0.9 },
    // sr_buy: { min: 0.1, max: 0.3 },
};

const meta: DebutMeta = {
    parameters,

    score(bot: str1) {
        const report = bot.plugins.stats.report();
        return report.balance - (report.maxBalance * report.potentialDD) / 100;

        // if (bot.plugins.shutdown && bot.plugins.shutdown.isShutdown()) {
        //     return 0;
        // }

        // return report.expectation;
    },

    stats(bot: str1) {
        return bot.plugins.stats.report();
    },

    async create(transport: BaseTransport, cfg: str1Options, env: WorkingEnv) {
        const bot = new str1(transport, cfg);

        if (env === WorkingEnv.genetic) {
            bot.registerPlugins([geneticShutdownPlugin(cfg.interval)]);
        } else if (env === WorkingEnv.tester) {
            bot.registerPlugins([reportPlugin(false)]);
            bot.plugins.report.addIndicators(bot.getIndicators());
        } else if (env === WorkingEnv.production) {
            bot.registerPlugins([debugPlugin()]);
        }

        return bot;
    },

    ticksFilter(cfg: str1Options) {
        if (!cfg.from && !cfg.to) {
            return () => true;
        }

        const tickValidator = createSessionValidator(cfg.from, cfg.to, cfg.noTimeSwitching);

        return (tick) => {
            return tickValidator(tick.time).inSession;
        };
    },

    validate(cfg: str1Options) {
        if (cfg.rsiOversold + cfg.rsiOverbought !== 100) {
            return false;
        }

        return cfg;
    },
};

export default meta;
