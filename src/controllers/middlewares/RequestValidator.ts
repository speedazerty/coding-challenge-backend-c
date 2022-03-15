import * as Joi from 'joi';
import { Response, Request, NextFunction } from 'express';

export class RequestValidator {
    public static getMiddleware(
        schema: Joi.Schema
    ): (req: Request, res: Response, next: NextFunction) => void {
        return (req: Request, res: Response, next: NextFunction) => {
            const { error } = schema.validate(req.query);
            const valid = error == null;

            if (valid) {
                next();
            } else {
                const { details } = error;
                const message = details.map((i) => i.message).join(',');

                res.status(400).json({ error: message });
            }
        };
    }
}
