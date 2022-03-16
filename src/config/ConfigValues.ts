export interface ConfigValues {
    app: {
        port: number;
    };

    database: {
        citySuggestionPostgres: {
            connectionString: string;
        };
    };
}
