import express from 'express';
import * as core from 'express-serve-static-core';
import { InversifyExpressServer } from 'inversify-express-utils';

export class App {
    constructor(
        private readonly httpServer: InversifyExpressServer,
        private readonly port: number
    ) {}

    public async start(): Promise<void> {
        const app = this.httpServer.build();

        await app.listen(this.port);

        console.log(
            'Server running at http://127.0.0.1:%d/suggestions',
            this.port
        );
    }
}
