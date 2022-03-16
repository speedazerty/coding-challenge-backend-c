import { ConfigValues } from './ConfigValues';

function env(envName: string): any {
    if (!process.env[envName]) {
        throw new Error(`Missing env variable ${envName}`);
    }
    return process.env[envName];
}

export class Config {
    public readonly values: ConfigValues;

    private constructor(values: ConfigValues) {
        this.values = values;
    }

    public static createFromEnvironmentVariables(): Config {
        return new Config({
            app: {
                port: +env('PORT'),
            },
            database: {
                citySuggestionPostgres: {
                    user: env('POSTGRES_USER'),
                    host: env('POSTGRES_HOST'),
                    databaseName: env('POSTGRES_DB_NAME'),
                    password: env('POSTGRES_PASSWORD'),
                    port: +env('POSTGRES_PORT'),
                },
            },
        });
    }
}
