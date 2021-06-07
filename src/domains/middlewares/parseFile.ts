import { NextApiRequest, NextApiResponse } from 'next';
import BusBoy from 'busboy';

type NextApiRequestWithFile = NextApiRequest & {
    file?: NodeJS.ReadableStream;
};

const parseFile = (req: NextApiRequestWithFile, res: NextApiResponse<{ message: string }>): Promise<boolean> => {
    return new Promise((resolve) => {
        const busboy = new BusBoy({ headers: req.headers });
        busboy.on('file', (_, f) => {
            req.file = f;
            resolve(true);
        });
        busboy.on('error', () => {
            res.status(400).json({ message: 'Invalid file.' });
            resolve(false);
        });
        req.pipe(busboy);
    });
};

export default parseFile;

export type { NextApiRequestWithFile };
