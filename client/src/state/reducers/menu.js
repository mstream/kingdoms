// @flow

import type {ClientAction} from '../actions';
import {
    CLOSE_CITY_VIEW,
    OPEN_CITY_VIEW,
    REQUEST_CITY_CREATION,
    UPDATE_STATE
} from '../actions';
import type {ClientState, ClientStateMenu} from '../state';
import {initialClientState} from '../state';
import {isCityBeingCreatedSelector, playerNameSelector} from '../selectors';

const openCityView = ({cityId, localState, globalState}: { cityId: string, localState: ClientStateMenu, globalState: ClientState }): ClientStateMenu => {
    if (globalState.serverState == null) {
        console.warn(`opening city view without the server state loaded`);
        return localState;
    }

    const playerId = globalState.player.name;

    if (playerId == null) {
        console.warn(`opening city view for not loaded player`);
        return localState;
    }

    const citiesByOwner = globalState.serverState.citiesByOwner;

    const playerCities = citiesByOwner[playerId];

    if (playerCities == null) {
        console.warn(`opening city view for player which does not own any city`);
        return localState;
    }

    if (!playerCities.includes(cityId)) {
        console.warn(`opening city view for player who does not own the city`);
        return localState;
    }

    return {
        ...localState,
        cityView: {
            ...localState.cityView,
            currentCityId: cityId,
        },
    };
};

export const menuReducer = (
    localState: ClientStateMenu = initialClientState.menu,
    action: ClientAction,
    globalState: ClientState,
): ClientStateMenu => {
    switch (action.type) {
        case CLOSE_CITY_VIEW: {
            return {
                ...localState,
                cityView: initialClientState.menu.cityView,
            };
        }
        case UPDATE_STATE: {
            const playerId = playerNameSelector(globalState);

            if (playerId == null) {
                return localState;
            }

            const isCityBeingCreated = isCityBeingCreatedSelector(globalState);

            if (isCityBeingCreated) {
                return localState;
            }

            const playerCities = action.payload.serverState.citiesByOwner[playerId];

            if (playerCities == null || playerCities.length === 0) {
                return localState;
            }

            return {
                ...localState,
                newCity: {
                    ...localState.newCity,
                    isCityBeingCreated: false,
                }
            };
        }
        case OPEN_CITY_VIEW: {
            return openCityView({
                cityId: action.payload.cityId,
                localState,
                globalState
            });
        }
        case REQUEST_CITY_CREATION: {
            return {
                ...localState,
                newCity: {
                    ...localState.newCity,
                    isCityBeingCreated: true,
                },
            };
        }
        default: {
            return localState;
        }
    }
};
