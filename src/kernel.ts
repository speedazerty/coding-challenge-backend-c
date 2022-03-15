import 'reflect-metadata';
import { Container } from 'inversify';
import { App } from './App';
import { TYPES } from './constants';
import { Config } from './config/Config';
import { InversifyExpressServer } from 'inversify-express-utils';

const kernel = new Container();
const config = Config.createFromEnvironmentVariables();

kernel
    .bind<App>(TYPES.App)
    .toDynamicValue(
        (context) =>
            new App(
                new InversifyExpressServer(context.container),
                config.values.app.port
            )
    );

export { kernel };
