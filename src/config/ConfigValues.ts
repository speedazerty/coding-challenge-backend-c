export interface ConfigValues {
    app: {
        port: number;
    };

    database: {
        citySuggestionPostgres: {
            user: string;
            host: string;
            databaseName: string;
            password: string;
            port: number;
        };
    };
}
