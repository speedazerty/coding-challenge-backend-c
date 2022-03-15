import { DistanceScoringService } from '../../domain/service/DistanceScoringService';
import { CitySuggestion } from '../../domain/models/CitySuggestion';
import * as Geolib from 'geolib';
import { injectable } from 'inversify';

@injectable()
export class RangeBasedDistanceScoringService
    implements DistanceScoringService
{
    public applyDistanceScoreToSuggestions(
        suggestions: CitySuggestion[],
        latitude: number,
        longitude: number
    ): CitySuggestion[] {
        return suggestions
            .map((suggestion: CitySuggestion) => {
                const distance =
                    Geolib.getDistance(
                        {
                            latitude: latitude,
                            longitude: longitude,
                        },
                        {
                            latitude: suggestion.getLatitude(),
                            longitude: suggestion.getLongitude(),
                        }
                    ) / 1000;
                const distanceScore = this.getDistanceScore(distance);

                // calculate the average score
                (suggestion as any).score =
                    Math.round(
                        (suggestion.getScore() + distanceScore / 2) * 100
                    ) / 100;
                return suggestion;
            })
            .sort((a, b) => {
                return a.getScore() > b.getScore() ? -1 : 1;
            });
    }

    private getDistanceScore(distanceInKm: number): number {
        let score = 0;

        // Arbitrary ranges based on PostgreSQL weight categories
        if (distanceInKm <= 10) {
            score += 1;
        } else if (distanceInKm > 10 && distanceInKm < 100) {
            score += 0.4;
        } else if (distanceInKm > 100 && distanceInKm < 500) {
            score += 0.2;
        }

        return score;
    }
}
