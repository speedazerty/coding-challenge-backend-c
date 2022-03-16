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
                const distanceScore = this.getDistanceScore(
                    distance,
                    suggestion.getScore()
                );

                (suggestion as any).score = Math.round(distanceScore * 10) / 10;
                return suggestion;
            })
            .sort((a, b) => {
                return a.getScore() > b.getScore() ? -1 : 1;
            });
    }

    private getDistanceScore(distanceInKm: number, baseScore: number): number {
        let score = baseScore;

        // Arbitrary ranges
        if (distanceInKm > 10 && distanceInKm <= 100) {
            // The base score decrease of 10%
            score -= (score * 10) / 100;
        } else if (distanceInKm > 100 && distanceInKm <= 500) {
            // The base score decrease of 30%
            score -= (score * 30) / 100;
        } else if (distanceInKm > 500 && distanceInKm <= 1000) {
            // The base score decrease of 50%
            score -= (score * 50) / 100;
        }

        return score;
    }
}
