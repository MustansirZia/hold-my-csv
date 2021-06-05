import { Config, ConfigValues } from './types';

class EnvironmentConfig implements Config {
    get(): ConfigValues {
        return {
            DATABASE_URI: process.env.DATABASE_URI as string,
        };
    }
}

export default EnvironmentConfig;
