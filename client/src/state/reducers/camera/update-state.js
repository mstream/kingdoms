// @flow

import type { ClientState, ClientStateCamera } from '../../state';
import type { ClientUpdateStateAction } from '../../actions';
import {
    addVectors,
    areVectorsEqual,
    negateVector,
} from '../../../../../common/src/vector';
import { tileVectorToPixelVector } from '../../../util';
import { serverStatePlayerCitiesSelector } from '../../selectors/server-state';
import {
    cityIdsOwnedByPlayerSelector,
    playerNameSelector,
    worldSelector,
} from '../../selectors/client-state';

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

    const calculateNewLocation = () => {
        const playerName = playerNameSelector(globalState);

        if (playerName == null) {
            return localState.geometry.location;
        }

        const cityIdsOwnedByPlayer = cityIdsOwnedByPlayerSelector(globalState);

        if (cityIdsOwnedByPlayer.length > 0) {
            return localState.geometry.location;
        }

        const serverStatePlayerCities = serverStatePlayerCitiesSelector(
            action.payload.serverState,
            { playerName },
        );

        if (serverStatePlayerCities.length === 0) {
            return localState.geometry.location;
        }

        const cityTileLocation = serverStatePlayerCities[0].location;

        return tileVectorToPixelVector({
            tileVector: addVectors({
                vector1: cityTileLocation,
                vector2: { x: 0.5, y: 0.5 },
            }),
        });
    };

    const calculateNewLocationLimit = () => {
        const world = worldSelector(globalState);
        const actionWorldSize = action.payload.serverState.world.size;

        if (world != null && areVectorsEqual({
            vector1: world.size,
            vector2: actionWorldSize,
        })) {
            return localState.locationLimit;
        }

        const halfWorldSize = tileVectorToPixelVector({
            tileVector: addVectors({
                vector1: actionWorldSize,
                vector2: { x: 0.5, y: 0.5 },
            }),
        });

        return {
            min: negateVector({ vector: halfWorldSize }),
            max: halfWorldSize,
        };
    };

    return {
        ...localState,
        geometry: {
            ...localState.geometry,
            location: calculateNewLocation(),
        },
        locationLimit: calculateNewLocationLimit(),
    };
};
