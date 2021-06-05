import { Config } from './types';
import EnvironmentConfig from './EnvironmentConfig';

export default {
    provide: (): Config => new EnvironmentConfig(),
};
