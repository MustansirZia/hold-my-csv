import { Config } from '../config/types';
import DatabaseCountriesService from './DatabaseCountriesService';
import { CountriesService } from './types';

export default {
    provide: (config: Config): CountriesService => new DatabaseCountriesService(config),
};
