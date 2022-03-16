import Joi from 'joi';

export class GetSuggestionsSchema {
    public static getSchema(): Joi.Schema {
        return Joi.object().keys({
            q: Joi.string().required().min(1).message(''),
            latitude: Joi.number()
                .when('longitude', {
                    is: Joi.number().exist(),
                    then: Joi.required(),
                    otherwise: Joi.forbidden(),
                })
                .messages({
                    'any.unknown':
                        'Latitude and Longitude must be provided together or none of them',
                    'any.required':
                        'Latitude and Longitude must be provided together or none of them',
                }),
            longitude: Joi.number().optional(),
        });
    }
}
