export class GetSuggestionsCommand {
    private readonly searchTerm: string;
    private readonly latitude?: number;
    private readonly longitude?: number;

    constructor(params: GetSuggestionsCommandParams) {
        this.searchTerm = params.searchTerm.toLowerCase();
        this.latitude = params.latitude
            ? Number.parseFloat(params.latitude)
            : undefined;
        this.longitude = params.longitude
            ? Number.parseFloat(params.longitude)
            : undefined;
    }

    public getSearchTerm() {
        return this.searchTerm;
    }

    public getLatitude() {
        return this.latitude;
    }

    public getLongitude() {
        return this.longitude;
    }
}

type GetSuggestionsCommandParams = {
    searchTerm: string;
    latitude?: string;
    longitude?: string;
};
