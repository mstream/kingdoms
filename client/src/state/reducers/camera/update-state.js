// @flow

import type { ClientState, ClientStateCamera } from '../../state';
import type { ClientUpdateStateAction } from '../../actions';
import { addVectors, negateVector } from '../../../../../common/src/vector';
import {
    isCityBeingCreatedSelector, playerNameSelector,
    serverStateSelector,
} from '../../selectors/client-state';
import { tileVectorToPixelVector } from '../../../util';
import { serverStatePlayerCitiesSelector } from '../../selectors/server-state';
import { initialClientState } from '../../state';

export const updateStateCameraReducer = (
    {
        localState,
        action,
        globalState,
    }:
        {
            localState: ClientStateCamera,
            action: ClientUpdateStateAction,
            globalState: ClientState,
        },
): ClientStateCamera => {
    if (serverStateSelector(globalState) == null) {
        const halfWorldSize = tileVectorToPixelVector({
            tileVector: addVectors({
                vector1: action.payload.serverState.world.size,
                vector2: { x: 0.5, y: 0.5 },
            }),
        });

        return {
            ...initialClientState.camera,
            locationLimit: {
                min: negateVector({ vector: halfWorldSize }),
                max: halfWorldSize,
            },
        };
    }

    const playerName = playerNameSelector(globalState);

    if (playerName == null) {
        return localState;
    }

    const actionPlayerCities = serverStatePlayerCitiesSelector(action.payload.serverState, { playerName });
    const shouldMoveToNewCity = isCityBeingCreatedSelector(globalState) && actionPlayerCities.length > 0;
    const newCity = actionPlayerCities[0];

    const newLocation = shouldMoveToNewCity ?
        tileVectorToPixelVector({ tileVector: newCity.location }) :
        localState.geometry.location;

    return {
        ...localState,
        geometry: {
            ...localState.geometry,
            location: {
                ...localState.geometry.location,
                ...newLocation,
            },
        },
    };
};
