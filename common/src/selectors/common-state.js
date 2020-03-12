// @flow

import { createSelector } from 'reselect';
import type {
    CommonState,
    CommonStateCities,
    CommonStateCity,
    CommonStateRules,
    CommonStateTime,
    CommonStateUnitStats,
    CommonStateWorld,
} from '../state/state';

import type { Vector } from '../vector';
import { addVectors, getDistanceBetweenVectors } from '../vector';

export const commonStateCitiesSelector = (state: CommonState): CommonStateCities => {
    return state.cities;
};

export const commonStateRulesSelector = (state: CommonState): CommonStateRules => {
    return state.rules;
};

export const commonStateTimeSelector = (state: CommonState): CommonStateTime => {
    return state.time;
};

export const commonStateWorldSelector = (state: CommonState): CommonStateWorld => {
    return state.world;
};

export const commonStateCityIdsByOwnerSelector = createSelector<CommonState, void, { [string]: $ReadOnlyArray<string> }, CommonStateCities>(
    commonStateCitiesSelector,
    (cities) => {
        return Object.keys(cities).reduce(
            (cityIdsByOwner, cityId) => {
                const city = cities[cityId];
                const playerId = city.ownerId;

                if (playerId == null) {
                    return cityIdsByOwner;
                }

                const playerCityIds = cityIdsByOwner[playerId];
                const newPlayerCityIds = [...(playerCityIds == null ? [] : [...playerCityIds]), cityId];

                return {
                    ...cityIdsByOwner,
                    [playerId]: newPlayerCityIds,
                };
            },
            Object.freeze({}),
        );
    },
);

export const commonStateCitiesByOwnerSelector = createSelector<CommonState, void, { [string]: $ReadOnlyArray<CommonStateCity> }, CommonStateCities, { [string]: $ReadOnlyArray<string> }>(
    commonStateCitiesSelector,
    commonStateCityIdsByOwnerSelector,
    (cities, cityIdsByOwner) => {
        return Object.keys(cityIdsByOwner).reduce(
            (citiesByOwner, ownerId) => {
                return {
                    ...citiesByOwner,
                    [ownerId]: cityIdsByOwner[ownerId].map(cityId => cities[cityId]),
                };
            },
            Object.freeze({}),
        );
    },
);

export const commonStateUnitStatsSelector = createSelector<CommonState, void, CommonStateUnitStats, CommonStateRules>(
    commonStateRulesSelector,
    (rules) => {
        return rules.unitStats;
    },
);

export const nextCitySpotSelector = createSelector<CommonState, void, ?Vector, CommonStateCities, CommonStateRules, CommonStateWorld>(
    commonStateCitiesSelector,
    commonStateRulesSelector,
    commonStateWorldSelector,
    (cities, rules, world) => {
        const takenSpots = Object.keys(cities).map(cityId => cities[cityId].location);

        const generateLocationHash = ({ location }: { location: Vector }): string => {
            return `${location.x}_${location.y}`;
        };

        const isSpotValid = ({ location }: { location: Vector }): boolean => {
            for (let yOffset = -rules.minimalCityMargin.y; yOffset <= rules.minimalCityMargin.y; yOffset++) {
                for (let xOffset = -rules.minimalCityMargin.x; xOffset <= rules.minimalCityMargin.x; xOffset++) {
                    const offset = { x: xOffset, y: yOffset };
                    const neighbouringTileLocation = addVectors({
                        vector1: location,
                        vector2: offset,
                    });
                    if (neighbouringTileLocation.x < -world.size.x) {
                        return false;
                    }
                    if (neighbouringTileLocation.x > world.size.x) {
                        return false;
                    }
                    if (neighbouringTileLocation.y < -world.size.y) {
                        return false;
                    }
                    if (neighbouringTileLocation.y > world.size.y) {
                        return false;
                    }
                    if (allocation[generateLocationHash({ location: neighbouringTileLocation })] === true) {
                        return false;
                    }
                }
            }
            return true;
        };

        const allocation = takenSpots.reduce(
            (allocation, location) => {
                return {
                    ...allocation,
                    [generateLocationHash({ location })]: true,
                };
            },
            {},
        );

        const freeSpots = [];

        for (let y = -world.size.y; y <= world.size.y; y++) {
            for (let x = -world.size.x; x <= world.size.x; x++) {
                const location = { x, y };
                if (isSpotValid({ location })) {
                    freeSpots.push(location);
                }
            }
        }

        freeSpots.sort((freeSpotLocation1, freeSpotLocation2) => getDistanceBetweenVectors({
            vector1: { x: 0, y: 0 },
            vector2: freeSpotLocation1,
        }) - getDistanceBetweenVectors({
            vector1: { x: 0, y: 0 },
            vector2: freeSpotLocation2,
        }));

        return freeSpots.length > 0 ? freeSpots[0] : null;
    },
);

