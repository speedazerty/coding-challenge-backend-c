import * as express from 'express';
import {
    controller,
    httpGet,
    request,
    response,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../constants';
import { GetSuggestionsCommandHandler } from '../application/GetSuggestionsCommandHandler';
import { GetSuggestionsCommand } from '../application/GetSuggestionsCommand';
import { RequestValidator } from './middlewares/RequestValidator';
import { GetSuggestionsSchema } from './validation/getSuggestionsSchema';

@controller('')
export class SuggestionsController {
    constructor(
        @inject(TYPES.GetSuggestionsCommandHandler)
        private readonly commandHandler: GetSuggestionsCommandHandler
    ) {}

    @httpGet(
        '/suggestions',
        RequestValidator.getMiddleware(GetSuggestionsSchema.getSchema())
    )
    private async getSuggestions(
        @request() req: express.Request,
        @response() res: express.Response
    ): Promise<void> {
        try {
            const command = new GetSuggestionsCommand({
                searchTerm: req.query.q as string,
                latitude: (req.query.latitude as string) || undefined,
                longitude: (req.query.longitude as string) || undefined,
            });

            const suggestions = await this.commandHandler.execute(command);

            res.json({ suggestions: suggestions });
        } catch (e) {
            // TODO use a logger and log the trace ID
            res.status(500).send('An unexpected error occurred');
        }
    }
}
