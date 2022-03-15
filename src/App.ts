import express from 'express';
import * as core from 'express-serve-static-core';

export class App {
    private readonly app: core.Express;

    constructor(private readonly port: number) {
        this.app = express();
    }

    public async start(): Promise<void> {
        this.app.get('/suggestions', (req, res) => {
            res.json([]);
        });

        this.app.listen(this.port, () => {
            console.log(
                'Server running at http://127.0.0.1:%d/suggestions',
                this.port
            );
        });
    }
}
