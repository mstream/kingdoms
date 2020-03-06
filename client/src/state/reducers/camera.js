// @flow
import {
    addVectors,
    multipleVectors,
    negateVector,
} from '../../../../common/src/vector';
import {clipToBoundary} from '../../../../common/src/boundary';
import type {ClientAction} from '../actions';
import {MOVE_CAMERA, UPDATE_STATE, ZOOM_CAMERA} from '../actions';
import type {ClientState, ClientStateCamera} from '../state';
import {initialClientState} from '../state';
import {
    isCityBeingCreatedSelector,
    playerNameSelector,
    serverStateSelector
} from '../selectors/clientState';
import {serverStatePlayerCitiesSelector} from '../selectors/serverState';
import {tileVectorToPixelVector} from '../../util';

export const cameraReducer = (
    localState: ClientStateCamera = initialClientState.camera,
    action: ClientAction,
    globalState: ClientState,
): ClientStateCamera => {
    switch (action.type) {
        case MOVE_CAMERA: {
            const newCameraLocation = clipToBoundary({
                vector: addVectors({
                    vector1: localState.geometry.location,
                    vector2: multipleVectors({
                        vector1: localState.geometry.size,
                        vector2: multipleVectors({
                            vector1: localState.movementSpeed,
                            vector2: action.payload.vector,
                        }),
                    }),
                }),
                boundary: localState.locationLimit,
            });

            return {
                ...localState,
                geometry: {
                    ...localState.geometry,
                    location: newCameraLocation,
                },
            };
        }
        case ZOOM_CAMERA: {
            const newCameraSize = clipToBoundary({
                vector: addVectors({
                    vector1: localState.geometry.size,
                    vector2: multipleVectors({
                        vector1: localState.zoomingSpeed,
                        vector2: action.payload.vector,
                    }),
                }),
                boundary: localState.sizeLimit,
            });

            return {
                ...localState,
                geometry: {
                    ...localState.geometry,
                    size: newCameraSize,
                },
            };
        }
        case UPDATE_STATE: {
            if (serverStateSelector(globalState) == null) {
                const halfWorldSize = tileVectorToPixelVector({
                    tileVector: addVectors({
                        vector1: action.payload.serverState.world.size,
                        vector2: {x: 0.5, y: 0.5}
                    }),
                });

                return {
                    ...initialClientState.camera,
                    locationLimit: {
                        min: negateVector({vector: halfWorldSize}),
                        max: halfWorldSize,
                    },
                };
            }

            const playerName = playerNameSelector(globalState);

            if (playerName == null) {
                return localState;
            }

            const actionPlayerCities = serverStatePlayerCitiesSelector(action.payload.serverState, {playerName});
            const shouldMoveToNewCity = isCityBeingCreatedSelector(globalState) && actionPlayerCities.length > 0;
            const newCity = actionPlayerCities[0];

            const newLocation = shouldMoveToNewCity ?
                tileVectorToPixelVector({tileVector: newCity.location}) :
                localState.geometry.location;

            return {
                ...localState,
                geometry: {
                    ...localState.geometry,
                    location: {
                        ...localState.geometry.location,
                        ...newLocation,
                    }
                }
            };
        }
        default: {
            return localState;
        }
    }
};
