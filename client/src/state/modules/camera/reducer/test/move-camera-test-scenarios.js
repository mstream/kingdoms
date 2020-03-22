// @flow

import { emptyClientState } from '../../../types';
import { moveCameraUp } from '../../actions';
import type { ClientStateCameraReducerTestScenario } from './types';
import type { ClientMoveCameraAction } from '../../actions/types';

export const moveCameraTestScenarios: $ReadOnlyArray<ClientStateCameraReducerTestScenario<ClientMoveCameraAction>> = [
    {
        name: 'moves camera up',
        action: moveCameraUp(),
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
                    min: {
                        ...emptyClientState.camera.locationLimit.min,
                        x: 0,
                        y: 0,
                    },
                    max: {
                        ...emptyClientState.camera.locationLimit.min,
                        x: 100,
                        y: 100,
                    },
                },
                movementSpeed: {
                    ...emptyClientState.camera.movementSpeed,
                    x: 0.1,
                    y: 0.1,
                },
            },
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
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
    },
    {
        name: 'does not move camera up when city view is open',
        action: moveCameraUp(),
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
                    min: {
                        ...emptyClientState.camera.locationLimit.min,
                        x: 0,
                        y: 0,
                    },
                    max: {
                        ...emptyClientState.camera.locationLimit.min,
                        x: 100,
                        y: 100,
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
                    currentCityId: 'city1',
                }
            },
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
            };
        },
    },
    {
        name: 'does not move camera up when attack view is open',
        action: moveCameraUp(),
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
                    min: {
                        ...emptyClientState.camera.locationLimit.min,
                        x: 0,
                        y: 0,
                    },
                    max: {
                        ...emptyClientState.camera.locationLimit.min,
                        x: 100,
                        y: 100,
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
                    attackedCityId: 'city1',
                }
            },
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
            };
        },
    },
];
