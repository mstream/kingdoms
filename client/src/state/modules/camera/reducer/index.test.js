// @flow

import { dummy } from '../../../actions';
import { cameraReducer } from './index';
import { zoomCameraTestScenarios } from './test/zoom-camera-test-scenarios';
import { updateStateTestScenarios } from './test/update-state-test-scenarios';
import { moveCameraTestScenarios } from './test/move-camera-test-scenarios';
import { zeroVector } from '../../../../../../common/src/vector';
import type { ClientDummyAction } from '../../../actions/types';
import { DUMMY } from '../../../actions/types';
import type { ClientStateCameraReducerTestScenario } from './test/types';
import { emptyClientState } from '../../state';
import { runTestScenarios } from '../../utils';
import { MOVE_CAMERA, ZOOM_CAMERA } from '../actions/types';
import { UPDATE_STATE } from '../../common-state/actions/types';


const stateInitializationScenario: ClientStateCameraReducerTestScenario<ClientDummyAction> = {
    name: 'initializes its state',
    action: dummy(),
    previousGlobalState: {
        ...emptyClientState,
        // $FlowFixMe
        camera: undefined,
    },
    expectedLocalStateCreator: ({ previousLocalState }) => {
        return {
            geometry: {
                location: {
                    x: 0,
                    y: 0,
                },
                size: {
                    x: 1280,
                    y: 800,
                },
            },
            locationLimit: {
                min: zeroVector,
                max: zeroVector,
            },
            movementSpeed: {
                x: 0.1,
                y: 0.1,
            },
            sizeLimit: {
                min: { x: 640, y: 400 },
                max: { x: 3200, y: 2000 },
            },
            zoomingSpeed: {
                x: 100,
                y: 100,
            },
        };
    },
};


describe('cameraReducer', () => {
    runTestScenarios({
        reducer: cameraReducer,
        reducerKey: 'camera',
        scenarios: {
            [DUMMY]: [stateInitializationScenario],
            [MOVE_CAMERA]: moveCameraTestScenarios,
            [UPDATE_STATE]: updateStateTestScenarios,
            [ZOOM_CAMERA]: zoomCameraTestScenarios,
        },
    });
});
