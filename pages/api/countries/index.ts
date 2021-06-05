import { NextApiRequest, NextApiResponse } from 'next';
import ConfigProvider from '../../../src/domains/config/ConfigProvider';
import CountriesServiceProvider from '../../../src/domains/countries/CountriesServiceProvider';
import LoggerProvider from '../../../src/domains/logger/LoggerProvider';
import CountriesController from '../../../src/domains/controllers/CountriesController';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const controller = new CountriesController(
        CountriesServiceProvider.provide(ConfigProvider.provide(), LoggerProvider.provide()),
        LoggerProvider.provide(),
    );
    switch (req.method?.toUpperCase()) {
        case 'POST':
            await controller.post(req, res);
            break;
        case 'DELETE':
            await controller.delete(req, res);
            break;
        default:
            res.status(405).send('METHOD NOT ALLOWED');
    }
};
