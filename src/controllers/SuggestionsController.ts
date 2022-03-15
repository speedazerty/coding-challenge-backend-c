import * as express from 'express';
import {
    controller,
    httpGet,
    request,
    response,
} from 'inversify-express-utils';

@controller('')
export class SuggestionsController {
    @httpGet('/suggestions')
    private async getSuggestions(
        @request() req: express.Request,
        @response() res: express.Response
    ): Promise<void> {
        try {
            res.json([]);
        } catch (e) {
            // TODO use a logger and log the trace ID
            res.status(500).send('An unexpected error occurred');
        }
    }
}
