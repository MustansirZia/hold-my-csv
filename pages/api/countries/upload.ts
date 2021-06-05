import type { NextApiRequest, NextApiResponse } from 'next';
import UploadServiceProvider from '../../../src/domains/upload/UploadServiceProvider';
import ConfigProvider from '../../../src/domains/config/ConfigProvider';
import CountriesServiceProvider from '../../../src/domains/countries/CountriesServiceProvider';
import LoggerProvider from '../../../src/domains/logger/LoggerProvider';
import UploadCountriesController from '../../../src/domains/controllers/UploadCountriesController';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const controller = new UploadCountriesController(
        UploadServiceProvider.provide(),
        CountriesServiceProvider.provide(ConfigProvider.provide(), LoggerProvider.provide()),
        LoggerProvider.provide(),
    );
    switch (req.method?.toUpperCase()) {
        case 'GET':
            await controller.get(req, res);
            break;
        case 'POST':
            await controller.post(req, res);
            break;
        default:
            res.status(405).send('METHOD NOT ALLOWED');
    }
};

export const config = {
    api: {
        bodyParser: false,
    },
};
