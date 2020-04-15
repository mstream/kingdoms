// @flow

import {
    clientActions,
} from '../../../../actions';
import {
    emptyClientState,
} from '../../../../../state';
import type {
    ClientMoveCameraAction,
} from '../../actions/types';
import type {
    ClientStateCameraReducerTestScenario,
} from './types';

type Scenarios = $ReadOnlyArray< ClientStateCameraReducerTestScenario< ClientMoveCameraAction >, >;

export const moveCameraTestScenarios: Scenarios = [
    {
        action                   : clientActions.camera.moveCameraUp(),
        expectedLocalStateCreator: (
            {
                previousLocalState,
            },
        ) => {

            return {
                ...previousLocalState,
                geometry: {
                    ...previousLocalState.geometry,
                    location: {
                        ...previousLocalState.geometry.location,
                        y: 40,
                    },
                },
            };

        },
        name               : `moves camera up`,
        previousGlobalState: {
            ...emptyClientState,
            camera: {
                ...emptyClientState.camera,
                geometry: {
                    ...emptyClientState.camera.geometry,
                    location: {
                        ...emptyClientState.camera.geometry.location,
                        x: 50,
                        y: 50,
                    },
                    size: {
                        ...emptyClientState.camera.geometry.size,
                        x: 100,
                        y: 100,
                    },
                },
                locationLimit: {
                    ...emptyClientState.camera.locationLimit,
                    max: {
                        ...emptyClientState.camera.locationLimit.min,
                        x: 100,
                        y: 100,
                    },
                    min: {
                        ...emptyClientState.camera.locationLimit.min,
                        x: 0,
                        y: 0,
                    },
                },
                movementSpeed: {
                    ...emptyClientState.camera.movementSpeed,
                    x: 0.1,
                    y: 0.1,
                },
            },
        },
    },
    {
        action                   : clientActions.camera.moveCameraUp(),
        expectedLocalStateCreator: (
            {
                previousLocalState,
            },
        ) => {

            return {
                ...previousLocalState,
            };

        },
        name               : `does not move camera up when city view is open`,
        previousGlobalState: {
            ...emptyClientState,
            camera: {
                ...emptyClientState.camera,
                geometry: {
                    ...emptyClientState.camera.geometry,
                    location: {
                        ...emptyClientState.camera.geometry.location,
                        x: 50,
                        y: 50,
                    },
                    size: {
                        ...emptyClientState.camera.geometry.size,
                        x: 100,
                        y: 100,
                    },
                },
                locationLimit: {
                    ...emptyClientState.camera.locationLimit,
                    max: {
                        ...emptyClientState.camera.locationLimit.min,
                        x: 100,
                        y: 100,
                    },
                    min: {
                        ...emptyClientState.camera.locationLimit.min,
                        x: 0,
                        y: 0,
                    },
                },
                movementSpeed: {
                    ...emptyClientState.camera.movementSpeed,
                    x: 0.1,
                    y: 0.1,
                },
            },
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: `city1`,
                },
            },
        },
    },
    {
        action                   : clientActions.camera.moveCameraUp(),
        expectedLocalStateCreator: (
            {
                previousLocalState,
            },
        ) => {

            return {
                ...previousLocalState,
            };

        },
        name               : `does not move camera up when attack view is open`,
        previousGlobalState: {
            ...emptyClientState,
            camera: {
                ...emptyClientState.camera,
                geometry: {
                    ...emptyClientState.camera.geometry,
                    location: {
                        ...emptyClientState.camera.geometry.location,
                        x: 50,
                        y: 50,
                    },
                    size: {
                        ...emptyClientState.camera.geometry.size,
                        x: 100,
                        y: 100,
                    },
                },
                locationLimit: {
                    ...emptyClientState.camera.locationLimit,
                    max: {
                        ...emptyClientState.camera.locationLimit.min,
                        x: 100,
                        y: 100,
                    },
                    min: {
                        ...emptyClientState.camera.locationLimit.min,
                        x: 0,
                        y: 0,
                    },
                },
                movementSpeed: {
                    ...emptyClientState.camera.movementSpeed,
                    x: 0.1,
                    y: 0.1,
                },
            },
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackedCityId: `city1`,
                },
            },
        },
    },
];
