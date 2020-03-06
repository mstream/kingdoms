// @flow

import type {CommonStateCities} from '../../../../common/src/state';

export const groupIdsByOwnerId = ({cities}: { cities: CommonStateCities; }): { [string]: $ReadOnlyArray<string> } => {
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
};
