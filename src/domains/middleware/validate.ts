import Joi, { ObjectSchema, ValidationError } from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

const validate = (schema: ObjectSchema, req: NextApiRequest, res: NextApiResponse): boolean => {
    try {
        Joi.assert(req.body, schema);
        return true;
    } catch (errors) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send((errors as ValidationError).details.map((error) => error.message));
        return false;
    }
};

export default validate;
