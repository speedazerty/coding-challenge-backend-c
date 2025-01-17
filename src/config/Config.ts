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
                    connectionString: env('DATABASE_URL'),
                    ssl: env('DATABASE_SSL') === 'true',
                },
            },
        });
    }
}
