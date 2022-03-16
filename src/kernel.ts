import 'reflect-metadata';
import { Container } from 'inversify';
import { App } from './App';
import { TYPES } from './constants';
import { Config } from './config/Config';
import { InversifyExpressServer } from 'inversify-express-utils';
import { GetSuggestionsCommandHandler } from './application/GetSuggestionsCommandHandler';
import { PostgresCitySuggestionRepository } from './infrastructure/domain/models/PostgresCitySuggestionRepository';
import { Pool } from 'pg';
import { RangeBasedDistanceScoringService } from './infrastructure/service/RangeBasedDistanceScoringService';

// load controllers metadata
import './controllers/SuggestionsController';
import { InMemorySuggestionResultRepository } from './infrastructure/domain/models/InMemorySuggestionResultRepository';

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

kernel
    .bind(TYPES.GetSuggestionsCommandHandler)
    .to(GetSuggestionsCommandHandler);

kernel
    .bind(TYPES.CitySuggestionRepository)
    .to(PostgresCitySuggestionRepository);

const postgresConfig = config.values.database.citySuggestionPostgres;
kernel.bind<Pool>(TYPES.PostgresConnectionPool).toDynamicValue(() => {
    return new Pool({
        connectionString: postgresConfig.connectionString,
        ssl: postgresConfig.ssl ? { rejectUnauthorized: false } : false,
    });
});

// TODO move ttl to config file
kernel
    .bind(TYPES.SuggestionResultRepository)
    .toConstantValue(new InMemorySuggestionResultRepository(900));

kernel.bind(TYPES.DistanceScoringService).to(RangeBasedDistanceScoringService);

export { kernel };
