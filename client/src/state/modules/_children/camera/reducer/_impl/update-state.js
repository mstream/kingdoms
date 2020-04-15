// @flow

import {
    addVectors,
    areVectorsEqual,
    negateVector,
} from '../../../../../../../../common/src/vector';
import {
    clientStateSelectors,
} from '../../../../selectors';
import {
    commonStateCitiesSelectors,
} from '../../../../../../../../common/src/state/modules/cities/selectors';
import {
    tileVectorToPixelVector,
} from '../../../../../../utils';
import type {
    ClientStateActionReducer,
} from '../../../../../types';
import type {
    ClientStateCamera,
} from '../types';
import type {
    ClientUpdateStateAction,
} from '../../../common-state/actions/types';

type Reducer = ClientStateActionReducer< ClientStateCamera,
    ClientUpdateStateAction, >;

export const updateStateCameraReducer: Reducer = (
    {
        localState,
        action,
        globalState,
    },
) => {

    const calculateNewLocation = () => {

        const playerName = clientStateSelectors.player.name(
            globalState,
        );

        if ( playerName == null ) {

            return localState.geometry.location;

        }

        const cityIdsOwnedByPlayer = clientStateSelectors.cityIdsOwnedByPlayer(
            globalState,
        );

        if ( cityIdsOwnedByPlayer == null || cityIdsOwnedByPlayer.length > 0 ) {

            return localState.geometry.location;

        }

        const commonStatePlayerCities = commonStateCitiesSelectors.citiesByOwner(
            action.payload.commonState,
        )[ playerName ];

        if (
            commonStatePlayerCities == null
            || commonStatePlayerCities.length === 0
        ) {

            return localState.geometry.location;

        }

        const [
            firstPlayerCity,
        ] = commonStatePlayerCities;

        return tileVectorToPixelVector(
            {
                tileVector: addVectors(
                    {
                        vector1: firstPlayerCity.location,
                        vector2: {
                            x: 0.5,
                            y: 0.5,
                        },
                    },
                ),
            },
        );

    };

    const calculateNewLocationLimit = () => {

        const world = clientStateSelectors.commonState.world(
            globalState,
        );
        const actionWorldSize = action.payload.commonState.world.size;

        if (
            world != null
            && areVectorsEqual(
                {
                    vector1: world.size,
                    vector2: actionWorldSize,
                },
            )
        ) {

            return localState.locationLimit;

        }

        const halfWorldSize = tileVectorToPixelVector(
            {
                tileVector: addVectors(
                    {
                        vector1: actionWorldSize,
                        vector2: {
                            x: 0.5,
                            y: 0.5,
                        },
                    },
                ),
            },
        );

        return {
            max: halfWorldSize,
            min: negateVector(
                {
                    vector: halfWorldSize,
                },
            ),
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
