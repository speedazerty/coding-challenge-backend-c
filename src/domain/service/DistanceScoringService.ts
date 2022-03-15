import { CitySuggestion } from '../models/CitySuggestion';

export interface DistanceScoringService {
    applyDistanceScoreToSuggestions(
        suggestions: CitySuggestion[],
        latitude: number,
        longitude: number
    ): CitySuggestion[];
}
