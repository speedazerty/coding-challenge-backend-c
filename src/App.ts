import express, { Application } from 'express';
import * as core from 'express-serve-static-core';
import { InversifyExpressServer } from 'inversify-express-utils';

export class App {
    private readonly expressApp: Application;

    constructor(
        private readonly httpServer: InversifyExpressServer,
        private readonly port: number
    ) {
        this.expressApp = this.httpServer.build();
    }

    public async start(): Promise<void> {
        await this.expressApp.listen(this.port);

        console.log(
            'Server running at http://127.0.0.1:%d/suggestions',
            this.port
        );
    }

    public getExpressApp(): Application {
        return this.expressApp;
    }
}
