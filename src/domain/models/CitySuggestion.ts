export class CitySuggestion {
    private readonly name: string;
    private readonly latitude: number;
    private readonly longitude: number;
    private readonly score: number;

    constructor(params: CitySuggestionParams) {
        this.name = params.name;
        this.latitude = Number.parseFloat(params.latitude);
        this.longitude = Number.parseFloat(params.longitude);
        this.score = Math.round(params.score * 10) / 10;
    }

    public getLongitude(): number {
        return this.longitude;
    }

    public getLatitude(): number {
        return this.latitude;
    }

    public getScore(): number {
        return this.score;
    }
}

export type CitySuggestionParams = {
    name: string;
    latitude: string;
    longitude: string;
    score: number;
};
