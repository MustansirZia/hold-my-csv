import mongoose from 'mongoose';
import { Config } from '../config/types';
import { Logger } from '../logger/types';
import { Country as CountryType, FetchRequest, FetchResult } from '../repository/types';
import Country from './models/Country';
import { CountriesService } from './types';

class DatabaseCountriesService implements CountriesService {
    private static connected = false;
    private logger: Logger;

    constructor(config: Config, logger: Logger) {
        this.logger = logger;
        if (!DatabaseCountriesService.connected) {
            this.connectToDatabase(config.get().DATABASE_URI);
        }
    }

    async fetchCountries(request: FetchRequest<CountryType>): Promise<FetchResult<CountryType>> {
        let query = Country.find();
        if (request.sortedVia) {
            query = query.sort({ [request.sortedVia]: request.sortOrder || 'asc' });
        }
        if (request.searchString?.trim()) {
            query = query.find({
                $or: [
                    { name: { $regex: request.searchString.trim(), $options: 'i' } },
                    { capital: { $regex: request.searchString.trim(), $options: 'i' } },
                    { nationalLanguage: { $regex: request.searchString.trim(), $options: 'i' } },
                    { president: { $regex: request.searchString.trim(), $options: 'i' } },
                ],
            });
        }
        const filters: { [key: string]: { $regex: string | number; $options: 'i' } } = {};
        for (const { name, searchString } of request.filters) {
            if (searchString.trim()) {
                filters[name] = { $regex: searchString.trim(), $options: 'i' };
            }
        }
        query = query.find(filters);
        return {
            totalPages: Math.ceil((await Country.find().merge(query).countDocuments().exec()) / request.itemsInPage),
            items: await query
                .skip(request.itemsInPage * request.currentPage)
                .limit(request.itemsInPage)
                .exec(),
        };
    }

    async deleteCountries(): Promise<void> {
        await Country.deleteMany();
    }

    async insertCountries(countries: Array<CountryType>): Promise<void> {
        await Country.insertMany(countries);
    }

    private connectToDatabase(databaseUri: string) {
        const db = mongoose.connection;
        db.on('error', (error) => this.logger.logError(error));
        db.once('open', () => {
            DatabaseCountriesService.connected = true;
        });
        mongoose.connect(databaseUri, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
    }
}

export default DatabaseCountriesService;
