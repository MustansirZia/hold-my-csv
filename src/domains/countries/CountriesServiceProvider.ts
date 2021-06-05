import { Config } from '../config/types';
import { Logger } from '../logger/types';
import DatabaseCountriesService from './DatabaseCountriesService';
import { CountriesService } from './types';

export default {
    provide: (config: Config, logger: Logger): CountriesService => new DatabaseCountriesService(config, logger),
};
