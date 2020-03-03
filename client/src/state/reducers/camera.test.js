// @flow

import {moveCameraUp, updateState, zoomCameraIn} from '../actions';
import type {ClientState, ClientStateCamera} from '../state';
import {emptyClientState, initialClientState} from '../state';
import {cameraReducer} from './camera';
import {emptyServerState} from '../../../../server/src/state/state';

describe('cameraReducer', () => {
    it('initializes its state', () => {
        const action = {
            type: '_DUMMY_',
        };

        const previousGlobalState: ClientState = {
            ...emptyClientState,
        };

        // $FlowFixMe
        const previousLocalState: ?ClientStateCamera = undefined;

        const expected: ClientStateCamera = {
            ...initialClientState.camera,
        };

        const actual = cameraReducer(previousLocalState, action, previousGlobalState);
        expect(actual).toEqual(expected);
    });

    it('handles update state event', () => {
        const serverState = {
            ...emptyServerState,
            world: {
                ...emptyServerState.world,
                size: {
                    x: 10,
                    y: 10,
                }
            }
        };

        const action = updateState({serverState});

        const previousGlobalState: ClientState = {
            ...emptyClientState,
        };

        const previousLocalState: ClientStateCamera = previousGlobalState.camera;

        const expected: ClientStateCamera = {
            ...initialClientState.camera,
            locationLimit: {
                min: {
                    x: -672,
                    y: -672,
                },
                max: {
                    x: 672,
                    y: 672,
                },
            },
        };

        const actual = cameraReducer(previousLocalState, action, previousGlobalState);
        expect(actual).toEqual(expected);
    });

    it('handles move camera up event', () => {
        const action = moveCameraUp();

        const previousGlobalState: ClientState = {
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
                    }
                },
                movementSpeed: {
                    ...emptyClientState.camera.movementSpeed,
                    x: 0.1,
                    y: 0.1,
                },
            }
        };

        const previousLocalState: ClientStateCamera = previousGlobalState.camera;

        const expected: ClientStateCamera = {
            ...previousLocalState,
            geometry: {
                ...previousLocalState.geometry,
                location: {
                    ...previousLocalState.geometry.location,
                    y: 40,
                }
            }
        };

        const actual = cameraReducer(previousLocalState, action, previousGlobalState);
        expect(actual).toEqual(expected);
    });

    it('handles zoom camera in event', () => {
        const action = zoomCameraIn();

        const previousGlobalState: ClientState = {
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
                    }
                },
                zoomingSpeed: {
                    ...emptyClientState.camera.zoomingSpeed,
                    x: 10,
                    y: 10,
                },
            }
        };

        const previousLocalState: ClientStateCamera = previousGlobalState.camera;

        const expected: ClientStateCamera = {
            ...previousLocalState,
            geometry: {
                ...previousLocalState.geometry,
                size: {
                    ...previousLocalState.geometry.size,
                    x: 90,
                    y: 90,
                }
            }
        };

        const actual = cameraReducer(previousLocalState, action, previousGlobalState);
        expect(actual).toEqual(expected);
    });
});
