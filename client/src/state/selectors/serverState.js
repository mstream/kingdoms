// @flow

import type {CommonStateCity, ServerState} from '../../../../common/src/state';
import {createSelector} from 'reselect';
import {groupIdsByOwnerId} from './util';

const serverStateSelector = (state: ServerState): ServerState => {
    return state;
};

const playerNameSelector = (state: ServerState, props: { playerName: string }) => {
    return props.playerName;
};

const cityIdsByOwnerSelector = createSelector<ServerState, { playerName: string }, { [string]: $ReadOnlyArray<string> }, ?ServerState>(
    serverStateSelector,
    (serverState) => {
        if (serverState == null) {
            return Object.freeze({});
        }
        return groupIdsByOwnerId({cities: serverState.cities});
    },
);

export const serverStatePlayerCityIdsSelector = createSelector<ServerState, { playerName: string }, $ReadOnlyArray<string>, { [string]: $ReadOnlyArray<string> }, string>(
    cityIdsByOwnerSelector,
    playerNameSelector,
    (cityIdsByOwner, playerName) => {
        const playerCityIds = cityIdsByOwner[playerName];
        return playerCityIds == null ? [] : playerCityIds;
    },
);

export const serverStatePlayerCitiesSelector = createSelector<ServerState, { playerName: string }, $ReadOnlyArray<CommonStateCity>, $ReadOnlyArray<string>, ServerState>(
    serverStatePlayerCityIdsSelector,
    serverStateSelector,
    (serverStatePlayerCityIds, serverState) => {
        return serverStatePlayerCityIds.map(cityId => serverState.cities[cityId]);
    },
);