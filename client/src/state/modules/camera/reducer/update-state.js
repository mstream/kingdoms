// @flow

import {
    addVectors,
    areVectorsEqual,
    negateVector,
} from '../../../../../../common/src/vector';
import { tileVectorToPixelVector } from '../../../../util';
import {
    cityIdsOwnedByPlayerSelector,
    worldSelector,
} from '../../../selectors';
import { commonStateCitiesByOwnerSelector } from '../../../../../../common/src/selectors/common-state';
import type { Vector } from '../../../../../../common/src/vector';
import type { CommonStateCity } from '../../../../../../common/src/state';
import type { ClientStateCamera } from './types';
import type { ClientState } from '../../root';
import { playerNameSelector } from '../../player/selectors';
import type { ClientUpdateStateAction } from '../../common-state/actions';

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

        const commonStatePlayerCities = commonStateCitiesByOwnerSelector(action.payload.commonState)[playerName];

        if (commonStatePlayerCities == null || commonStatePlayerCities.length === 0) {
            return localState.geometry.location;
        }

        const firstPlayerCity: CommonStateCity = commonStatePlayerCities[0];

        return tileVectorToPixelVector({
            tileVector: addVectors({
                vector1: firstPlayerCity.location,
                vector2: { x: 0.5, y: 0.5 },
            }),
        });
    };

    const calculateNewLocationLimit = () => {
        const world = worldSelector(globalState);
        const actionWorldSize = action.payload.commonState.world.size;

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
