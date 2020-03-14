// @flow

import type { ClientZoomCameraAction } from '../../actions';
import { zoomCameraIn } from '../../actions';
import { emptyClientState } from '../../state';
import type { ClientStateCameraReducerTestScenario } from './index';


export const zoomCameraTestScenarios: $ReadOnlyArray<ClientStateCameraReducerTestScenario<ClientZoomCameraAction>> = [
    {
        name: 'zooms camera in',
        action: zoomCameraIn(),
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
                    min: {
                        ...emptyClientState.camera.sizeLimit.min,
                        x: 0,
                        y: 0,
                    },
                    max: {
                        ...emptyClientState.camera.sizeLimit.min,
                        x: 200,
                        y: 200,
                    },
                },
                zoomingSpeed: {
                    ...emptyClientState.camera.zoomingSpeed,
                    x: 10,
                    y: 10,
                },
            },
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
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
    },
    {
        name: 'does not zoom camera in when city view is open',
        action: zoomCameraIn(),
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
                    min: {
                        ...emptyClientState.camera.sizeLimit.min,
                        x: 0,
                        y: 0,
                    },
                    max: {
                        ...emptyClientState.camera.sizeLimit.min,
                        x: 200,
                        y: 200,
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
                    currentCityId: '1',
                }
            }
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
            };
        },
    },
    {
        name: 'does not zoom camera in when attack view is open',
        action: zoomCameraIn(),
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
                    min: {
                        ...emptyClientState.camera.sizeLimit.min,
                        x: 0,
                        y: 0,
                    },
                    max: {
                        ...emptyClientState.camera.sizeLimit.min,
                        x: 200,
                        y: 200,
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
                    attackedCityId: '1',
                }
            }
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
            };
        },
    },
];
