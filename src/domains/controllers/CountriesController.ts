import Joi from 'joi';
import type { NextApiRequest, NextApiResponse } from 'next';
import validate from '../middlewares/validate';
import { Country, FetchRequest, FetchResult } from '../repository/types';
import { CountriesService } from '../countries/types';
import { Logger } from '../logger/types';

const querySchema = Joi.object({
    itemsInPage: Joi.number().required(),
    currentPage: Joi.number().required(),
    filters: Joi.array()
        .items(
            Joi.object({
                name: Joi.string(),
                searchString: Joi.string(),
            }),
        )
        .required(),
    searchString: Joi.string().allow(''),
    sortedVia: Joi.string(),
    sortOrder: Joi.valid('asc', 'desc'),
});

class CountriesController {
    private countriesService: CountriesService;
    private logger: Logger;

    constructor(countriesService: CountriesService, logger: Logger) {
        this.countriesService = countriesService;
        this.logger = logger;
    }

    async post(req: NextApiRequest, res: NextApiResponse<FetchResult<Country> | { message: string }>): Promise<void> {
        const valid = validate(querySchema, req, res);
        if (!valid) {
            return;
        }
        try {
            res.status(200).json(await this.countriesService.fetchCountries(req.body as FetchRequest<Country>));
        } catch (error) {
            this.logger.logError(error);
            res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
        }
    }

    async delete(req: NextApiRequest, res: NextApiResponse<{ message: string }>): Promise<void> {
        try {
            await this.countriesService.deleteCountries();
            res.status(200).json({ message: 'OK' });
        } catch (error) {
            this.logger.logError(error);
            res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
        }
    }
}

export default CountriesController;
