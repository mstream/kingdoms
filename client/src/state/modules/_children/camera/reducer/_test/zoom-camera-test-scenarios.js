// @flow

import type {
    ClientStateCameraReducerTestScenario,
} from './types';
import type {
    ClientZoomCameraAction,
} from '../../actions/types';
import {
    emptyClientState,
} from '../../../../../state';
import {
    clientActions,
} from '../../../../actions';

export const zoomCameraTestScenarios: $ReadOnlyArray< ClientStateCameraReducerTestScenario< ClientZoomCameraAction >, > = [
    {
        action                   : clientActions.camera.zoomCameraIn(),
        expectedLocalStateCreator: (
            {
                previousLocalState,
            },
        ) => {

            return {
                ...previousLocalState,
                geometry: {
                    ...previousLocalState.geometry,
                    size: {
                        ...previousLocalState.geometry.size,
                        x: 90,
                        y: 90,
                    },
                },
            };

        },
        name               : `zooms camera in`,
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
                sizeLimit: {
                    ...emptyClientState.camera.sizeLimit,
                    max: {
                        ...emptyClientState.camera.sizeLimit.min,
                        x: 200,
                        y: 200,
                    },
                    min: {
                        ...emptyClientState.camera.sizeLimit.min,
                        x: 0,
                        y: 0,
                    },
                },
                zoomingSpeed: {
                    ...emptyClientState.camera.zoomingSpeed,
                    x: 10,
                    y: 10,
                },
            },
        },
    },
    {
        action                   : clientActions.camera.zoomCameraIn(),
        expectedLocalStateCreator: (
            {
                previousLocalState,
            },
        ) => {

            return {
                ...previousLocalState,
            };

        },
        name               : `does not zoom camera in when city view is open`,
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
                sizeLimit: {
                    ...emptyClientState.camera.sizeLimit,
                    max: {
                        ...emptyClientState.camera.sizeLimit.min,
                        x: 200,
                        y: 200,
                    },
                    min: {
                        ...emptyClientState.camera.sizeLimit.min,
                        x: 0,
                        y: 0,
                    },
                },
                zoomingSpeed: {
                    ...emptyClientState.camera.zoomingSpeed,
                    x: 10,
                    y: 10,
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
        action                   : clientActions.camera.zoomCameraIn(),
        expectedLocalStateCreator: (
            {
                previousLocalState,
            },
        ) => {

            return {
                ...previousLocalState,
            };

        },
        name               : `does not zoom camera in when attack view is open`,
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
                sizeLimit: {
                    ...emptyClientState.camera.sizeLimit,
                    max: {
                        ...emptyClientState.camera.sizeLimit.min,
                        x: 200,
                        y: 200,
                    },
                    min: {
                        ...emptyClientState.camera.sizeLimit.min,
                        x: 0,
                        y: 0,
                    },
                },
                zoomingSpeed: {
                    ...emptyClientState.camera.zoomingSpeed,
                    x: 10,
                    y: 10,
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
