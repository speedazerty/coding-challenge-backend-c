import Joi from 'joi';

export class GetSuggestionsSchema {
    public static getSchema(): Joi.Schema {
        return Joi.object().keys({
            q: Joi.string().required().min(1),
            latitude: Joi.number().optional(),
            longitude: Joi.number().optional(),
        });
    }
}
