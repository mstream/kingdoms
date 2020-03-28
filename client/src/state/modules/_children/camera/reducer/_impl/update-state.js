// @flow

import {
    addVectors,
    areVectorsEqual,
    negateVector,
} from '../../../../../../../../common/src/vector';
import { tileVectorToPixelVector } from '../../../../../../util';
import type { ClientStateCamera } from '../types';
import { clientStatePlayerSelectors } from '../../../player/selectors';
import type { CommonStateCity } from '../../../../../../../../common/src/state/modules/cities/reducer/types';
import type { ClientUpdateStateAction } from '../../../common-state/actions/types';
import { commonStateCitiesSelectors } from '../../../../../../../../common/src/state/modules/cities/selectors';
import { clientStateSelectors } from '../../../../selectors';
import { clientStateCommonStateSelectors } from '../../../common-state/selectors';
import type { ClientStateActionReducer } from '../../../../../types';

type Reducer = ClientStateActionReducer<ClientStateCamera, ClientUpdateStateAction>;


export const updateStateCameraReducer: Reducer = (
    {
        localState,
        action,
        globalState,
    },
) => {

    const calculateNewLocation = () => {
        const playerName = clientStatePlayerSelectors.name(globalState);

        if (playerName == null) {
            return localState.geometry.location;
        }

        const cityIdsOwnedByPlayer = clientStateSelectors.cityIdsOwnedByPlayer(globalState);

        if (cityIdsOwnedByPlayer == null || cityIdsOwnedByPlayer.length > 0) {
            return localState.geometry.location;
        }

        const commonStatePlayerCities = commonStateCitiesSelectors.citiesByOwner(action.payload.commonState)[playerName];

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
        const world = clientStateCommonStateSelectors.world(globalState);
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
