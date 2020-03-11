// @flow

import { createSelector } from 'reselect';
import type {
    CommonState,
    CommonStateCities,
    CommonStateCity,
    CommonStateRules,
    CommonStateTime, CommonStateUnitStats,
    CommonStateWorld,
} from '../state';

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
