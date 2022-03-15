export class CitySuggestion {
    private readonly name: string;
    private readonly latitude: string;
    private readonly longitude: string;
    private readonly score: number;

    constructor(params: CitySuggestionParams) {
        this.name = params.name;
        this.latitude = params.latitude;
        this.longitude = params.longitude;
        this.score = params.score;
    }
}

export type CitySuggestionParams = {
    name: string;
    latitude: string;
    longitude: string;
    score: number;
};
