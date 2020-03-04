// @flow

import type {ClientAction} from '../actions';
import type {ClientState, ClientStateMenu} from '../state';
import {initialClientState} from '../state';
import type {ServerState} from '../../../../common/src/state';
import {
    CLOSE_CITY_VIEW,
    NAVIGATE_TO_NEXT_CITY,
    NAVIGATE_TO_PREVIOUS_CITY, OPEN_CITY_VIEW, REQUEST_CITY_CREATION
} from '../actions';

const calculatePreviousCity = ({currentCityId, cityIds}: { currentCityId: string, cityIds: $ReadOnlyArray<string> }): ?string => {
    if (cityIds.length === 0) {
        return null;
    }
    const sortedCityIds = [...cityIds].sort();
    const currentCityIdIndex = sortedCityIds.indexOf(currentCityId);
    return currentCityIdIndex === 0 ? sortedCityIds[cityIds.length - 1] : sortedCityIds[currentCityIdIndex - 1];
};

const calculateNextCity = ({currentCityId, cityIds}: { currentCityId: string, cityIds: $ReadOnlyArray<string> }): ?string => {
    if (cityIds.length === 0) {
        return null;
    }
    const sortedCityIds = [...cityIds].sort();
    const currentCityIdIndex = sortedCityIds.indexOf(currentCityId);
    return currentCityIdIndex === sortedCityIds.length - 1 ? sortedCityIds[0] : sortedCityIds[currentCityIdIndex + 1];
};

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

    const currentCityId = cityId;

    const nextCityId = calculateNextCity({
        currentCityId,
        cityIds: playerCities,
    });

    const previousCityId = calculatePreviousCity({
        currentCityId,
        cityIds: playerCities,
    });

    return {
        ...localState,
        cityView: {
            ...localState.cityView,
            currentCityId,
            nextCityId,
            previousCityId,
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
        case NAVIGATE_TO_NEXT_CITY: {
            if (localState.cityView.nextCityId == null) {
                console.warn(`navigating to missing next city`);
                return localState;
            }
            return openCityView({cityId: localState.cityView.nextCityId, localState, globalState});
        }
        case NAVIGATE_TO_PREVIOUS_CITY: {
            if (localState.cityView.previousCityId == null) {
                console.warn(`navigating to missing previous city`);
                return localState;
            }
            return openCityView({cityId: localState.cityView.previousCityId, localState, globalState});
        }
        case OPEN_CITY_VIEW: {
            return openCityView({cityId: action.payload.cityId, localState, globalState});
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
