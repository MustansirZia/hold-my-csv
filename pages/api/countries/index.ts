import Joi from 'joi';
import type { NextApiRequest, NextApiResponse } from 'next';
import ConfigProvider from '../../../src/domains/config/ConfigProvider';
import validate from '../../../src/domains/middleware/validate';
import { Country, FetchRequest, FetchResult } from '../../../src/domains/repository/types';
import CountriesServiceProvider from '../../../src/domains/countries/CountriesServiceProvider';
import { CountriesService } from '../../../src/domains/countries/types';

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
    countriesService: CountriesService;

    constructor(countriesService: CountriesService) {
        this.countriesService = countriesService;
    }

    async post(req: NextApiRequest, res: NextApiResponse<FetchResult<Country>>): Promise<void> {
        const valid = validate(querySchema, req, res);
        if (!valid) {
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(await this.countriesService.fetchCountries(req.body as FetchRequest<Country>));
    }

    async delete(req: NextApiRequest, res: NextApiResponse<{ message: string }>): Promise<void> {
        await this.countriesService.deleteCountries();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send({ message: 'OK' });
    }
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const controller = new CountriesController(CountriesServiceProvider.provide(ConfigProvider.provide()));
    switch (req.method?.toUpperCase()) {
        case 'POST':
            controller.post(req, res);
            break;
        case 'DELETE':
            controller.delete(req, res);
            break;
        default:
            res.status(405).send('METHOD NOT ALLOWED');
    }
};
