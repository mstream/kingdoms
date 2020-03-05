// @flow

import type {ClientState, ClientStateCamera, ClientStateTiles} from '../state';
import {createSelector} from 'reselect';
import type {
    CommonStateCities,
    CommonStateCity,
    ServerState
} from '../../../../common/src/state';

export const isCityBeingCreatedSelector = (state: ClientState): boolean => {
    return state.menu.newCity.isCityBeingCreated;
};

export const tilesSelector = (state: ClientState): ClientStateTiles => {
    return state.tiles;
};

export const cameraSelector = (state: ClientState): ClientStateCamera => {
    return state.camera;
};

export const playerNameSelector = (state: ClientState): ?string => {
    return state.player.name;
};

export const serverStateSelector = (state: ClientState): ?ServerState => {
    return state.serverState;
};

export const currentlyViewedCityIdSelector = (state: ClientState): ?string => {
    return state.menu.cityView.currentCityId;
};

export const citiesSelector = createSelector<ClientState, void, ?CommonStateCities, ?ServerState>(
    serverStateSelector,
    (serverState) => {
        if (serverState == null) {
            return null;
        }
        return serverState.cities;
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

export const citiesOwnedByPlayerSelector = createSelector<ClientState, void, $ReadOnlyArray<string>, ?string, ?ServerState>(
    playerNameSelector,
    serverStateSelector,
    (playerName, serverState) => {
        if (playerName == null || serverState == null) {
            return [];
        }

        const citiesOwnedByPlayer = serverState.citiesByOwner[playerName];

        return citiesOwnedByPlayer == null ? [] : citiesOwnedByPlayer;
    },
);

export const isGameStartingSelector = createSelector<ClientState, void, boolean, $ReadOnlyArray<string>, ?string>(
    citiesOwnedByPlayerSelector,
    playerNameSelector,
    (citiesOwnedByPlayer, playerName) => {
        return playerName != null && citiesOwnedByPlayer.length === 0;
    },
);

export const nextCityIdSelector = createSelector<ClientState, void, ?string, $ReadOnlyArray<string>, ?string>(
    citiesOwnedByPlayerSelector,
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
    }
);

export const previousCityIdSelector = createSelector<ClientState, void, ?string, $ReadOnlyArray<string>, ?string>(
    citiesOwnedByPlayerSelector,
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
    }
);
