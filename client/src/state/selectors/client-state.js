// @flow

import type {
    ClientState,
    ClientStateCamera,
    ClientStateCityViewTab,
    ClientStateMenu,
    ClientStateTiles,
} from '../state';
import { createSelector } from 'reselect';
import type {
    CommonStateCities,
    CommonStateCity,
    CommonStateRules,
    CommonStateWorld,
    CommonState,
} from '../../../../common/src/state';
import {
    commonStateCitiesSelector, commonStateCityIdsByOwnerSelector,
    commonStateRulesSelector, commonStateWorldSelector,
} from '../../../../common/src/selectors/common-state';

export const cameraSelector = (state: ClientState): ClientStateCamera => {
    return state.camera;
};

export const menuSelector = (state: ClientState): ClientStateMenu => {
    return state.menu;
};

export const tilesSelector = (state: ClientState): ClientStateTiles => {
    return state.tiles;
};

export const commonStateSelector = (state: ClientState): ?CommonState => {
    return state.commonState;
};


export const playerNameSelector = (state: ClientState): ?string => {
    return state.player.name;
};

export const isCityBeingCreatedSelector = (state: ClientState): boolean => {
    return state.menu.newCity.isCityBeingCreated;
};

export const currentlyViewedCityIdSelector = (state: ClientState): ?string => {
    return state.menu.cityView.currentCityId;
};

export const citiesSelector = createSelector<ClientState, void, ?CommonStateCities, ?CommonState>(
    commonStateSelector,
    (commonState) => {
        if (commonState == null) {
            return null;
        }
        return commonStateCitiesSelector(commonState);
    },
);

export const rulesSelector = createSelector<ClientState, void, ?CommonStateRules, ?CommonState>(
    commonStateSelector,
    (commonState) => {
        if (commonState == null) {
            return null;
        }
        return commonStateRulesSelector(commonState);
    },
);

export const worldSelector = createSelector<ClientState, void, ?CommonStateWorld, ?CommonState>(
    commonStateSelector,
    (commonState) => {
        if (commonState == null) {
            return null;
        }
        return commonStateWorldSelector(commonState);
    },
);

export const cityIdsByOwnerSelector = createSelector<ClientState, void, { [string]: $ReadOnlyArray<string> }, ?CommonState>(
    commonStateSelector,
    (commonState) => {
        if (commonState == null) {
            return Object.freeze({});
        }
        return commonStateCityIdsByOwnerSelector(commonState);
    },
);

export const currentlyViewedCitySelector = createSelector<ClientState, void, ?CommonStateCity, ?CommonStateCities, ?string>(
    citiesSelector,
    currentlyViewedCityIdSelector,
    (cities, currentlyViewedCityId) => {
        if (cities == null || currentlyViewedCityId == null) {
            return null;
        }

        return cities[currentlyViewedCityId];
    },
);

export const activeCityTabSelector = createSelector<ClientState, void, ClientStateCityViewTab, ClientStateMenu>(
    menuSelector,
    (menu) => {
        return menu.cityView.tab;
    },
);

export const cityIdsOwnedByPlayerSelector = createSelector<ClientState, void, $ReadOnlyArray<string>, { [string]: $ReadOnlyArray<string> }, ?string>(
    cityIdsByOwnerSelector,
    playerNameSelector,
    (cityIdsByOwner, playerName) => {
        if (playerName == null) {
            return [];
        }

        const playerCityIds = cityIdsByOwner[playerName];

        return playerCityIds == null ? [] : playerCityIds;
    },
);

export const isGameStartingSelector = createSelector<ClientState, void, boolean, $ReadOnlyArray<string>, ?string, ?CommonState>(
    cityIdsOwnedByPlayerSelector,
    playerNameSelector,
    commonStateSelector,
    (citiesOwnedByPlayer, playerName, commonState) => {
        return commonState != null && playerName != null && citiesOwnedByPlayer.length === 0;
    },
);

export const nextCityIdSelector = createSelector<ClientState, void, ?string, $ReadOnlyArray<string>, ?string>(
    cityIdsOwnedByPlayerSelector,
    currentlyViewedCityIdSelector,
    (citiesOwnedByPlayer, currentlyViewedCity) => {
        if (currentlyViewedCity == null) {
            return null;
        }

        if (citiesOwnedByPlayer.length < 2) {
            return null;
        }

        const sortedCityIds = [...citiesOwnedByPlayer].sort();
        const currentlyViewedCityIndex = sortedCityIds.indexOf(currentlyViewedCity);
        return currentlyViewedCityIndex === 0 ? sortedCityIds[citiesOwnedByPlayer.length - 1] : sortedCityIds[currentlyViewedCityIndex - 1];
    },
);

export const previousCityIdSelector = createSelector<ClientState, void, ?string, $ReadOnlyArray<string>, ?string>(
    cityIdsOwnedByPlayerSelector,
    currentlyViewedCityIdSelector,
    (citiesOwnedByPlayer, currentlyViewedCity) => {
        if (currentlyViewedCity == null) {
            return null;
        }

        if (citiesOwnedByPlayer.length < 2) {
            return null;
        }

        const sortedCityIds = [...citiesOwnedByPlayer].sort();
        const currentlyViewedCityIndex = sortedCityIds.indexOf(currentlyViewedCity);
        return currentlyViewedCityIndex === citiesOwnedByPlayer.length - 1 ? sortedCityIds[0] : sortedCityIds[currentlyViewedCityIndex + 1];
    },
);