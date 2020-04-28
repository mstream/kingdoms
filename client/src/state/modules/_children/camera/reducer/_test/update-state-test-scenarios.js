// @flow

import {
    addVectors,
    negateVector,
} from '../../../../../../../../common/src/vector';
import {
    clientActions,
} from '../../../../actions';
import {
    emptyCityState,
} from '../../../../../../../../common/src/state/modules/_children/cities/reducer/state';
import {
    emptyClientState,
} from '../../../../../state';
import {
    emptyCommonState,
} from '../../../../../../../../common/src/state/modules/state';
import {
    tileVectorToPixelVector,
} from '../../../../../../utils';
import type {
    ClientStateCameraReducerTestScenario,
} from './types';
import type {
    ClientUpdateStateAction,
} from '../../../common-state/actions/types';

type Scenario = ClientStateCameraReducerTestScenario< ClientUpdateStateAction >;
type Scenarios = $ReadOnlyArray< Scenario, >;

export const updateStateTestScenarios: Scenarios = [
    {
        action: clientActions.commonState.updateState(
            {
                commonState: {
                    ...emptyCommonState,
                    world: {
                        ...emptyCommonState.world,
                        size: {
                            x: 10,
                            y: 10,
                        },
                    },
                },
            },
        ),
        expectedLocalStateCreator: (
            {
                previousLocalState,
            },
        ) => {

            return {
                ...previousLocalState,
                locationLimit: {
                    ...previousLocalState.locationLimit,
                    max: tileVectorToPixelVector(
                        {
                            tileVector: addVectors(
                                {
                                    vector1: {
                                        x: 10,
                                        y: 10,
                                    },
                                    vector2: {
                                        x: 0.5,
                                        y: 0.5,
                                    },
                                },
                            ),
                        },
                    ),
                    min: negateVector(
                        {
                            vector: tileVectorToPixelVector(
                                {
                                    tileVector: addVectors(
                                        {
                                            vector1: {
                                                x: 10,
                                                y: 10,
                                            },
                                            vector2: {
                                                x: 0.5,
                                                y: 0.5,
                                            },
                                        },
                                    ),
                                },
                            ),
                        },
                    ),
                },
            };

        },
        name               : `updates state`,
        previousGlobalState: {
            ...emptyClientState,
        },
    },
    {
        action: clientActions.commonState.updateState(
            {
                commonState: {
                    ...emptyCommonState,
                    cities: {
                        city1: {
                            ...emptyCityState,
                            ownerId: `player2`,
                        },
                        city2: {
                            ...emptyCityState,
                            location: {
                                ...emptyCityState.location,
                                x: 2,
                                y: 4,
                            },
                            ownerId: `player1`,
                        },
                    },
                    world: {
                        ...emptyCommonState.world,
                        size: {
                            x: 10,
                            y: 10,
                        },
                    },
                },
            },
        ),
        expectedLocalStateCreator: (
            {
                previousLocalState,
            },
        ) => {

            return {
                ...previousLocalState,
                geometry: {
                    ...previousLocalState.geometry,
                    location: tileVectorToPixelVector(
                        {
                            tileVector: addVectors(
                                {
                                    vector1: {
                                        x: 2,
                                        y: 4,
                                    },
                                    vector2: {
                                        x: 0.5,
                                        y: 0.5,
                                    },
                                },
                            ),
                        },
                    ),
                },
            };

        },
        name               : `centers camera on the newly created city`,
        previousGlobalState: {
            ...emptyClientState,
            camera: {
                ...emptyClientState.camera,
                geometry: {
                    ...emptyClientState.camera.geometry,
                    location: {
                        ...emptyClientState.camera.geometry.location,
                        x: 0,
                        y: 0,
                    },
                },
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    city1: {
                        ...emptyCityState,
                        ownerId: `player2`,
                    },
                },
                world: {
                    ...emptyCommonState.world,
                    size: {
                        x: 10,
                        y: 10,
                    },
                },
            },
            player: {
                name: `player1`,
            },
        },
    },
];
