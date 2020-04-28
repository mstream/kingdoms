// @flow

import {
    DUMMY,
} from '../../../actions/types';
import {
    MOVE_CAMERA, ZOOM_CAMERA,
} from '../actions/types';
import {
    UPDATE_STATE,
} from '../../common-state/actions/types';
import {
    cameraReducer,
} from './index';
import {
    clientActions,
} from '../../../actions';
import {
    emptyClientState,
} from '../../../../state';
import {
    moveCameraTestScenarios,
} from './_test/move-camera-test-scenarios';
import {
    runReducerTestScenarios,
} from '../../../../test-utils';
import {
    updateStateTestScenarios,
} from './_test/update-state-test-scenarios';
import {
    zeroVector,
} from '../../../../../../../common/src/vector';
import {
    zoomCameraTestScenarios,
} from './_test/zoom-camera-test-scenarios';
import type {
    ClientDummyAction,
} from '../../../actions/types';
import type {
    ClientStateCameraReducerTestScenario,
} from './_test/types';

type StateInitializationScenario =
    ClientStateCameraReducerTestScenario< ClientDummyAction >;

const stateInitializationScenario: StateInitializationScenario = {
    action                   : clientActions.global.dummy(),
    expectedLocalStateCreator: () => {

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
                max: zeroVector,
                min: zeroVector,
            },
            movementSpeed: {
                x: 0.1,
                y: 0.1,
            },
            sizeLimit: {
                max: {
                    x: 3200,
                    y: 2000,
                },
                min: {
                    x: 640,
                    y: 400,
                },
            },
            zoomingSpeed: {
                x: 100,
                y: 100,
            },
        };

    },
    name               : `initializes its state`,
    previousGlobalState: {
        ...emptyClientState,

        // $FlowFixMe
        camera: undefined,
    },
};

describe(
    `cameraReducer`,
    () => {

        runReducerTestScenarios(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },
                reducer   : cameraReducer,
                reducerKey: `camera`,
                scenarios : {
                    [ DUMMY ]: [
                        stateInitializationScenario,
                    ],
                    [ MOVE_CAMERA ] : moveCameraTestScenarios,
                    [ UPDATE_STATE ]: updateStateTestScenarios,
                    [ ZOOM_CAMERA ] : zoomCameraTestScenarios,
                },
            },
        );

    },
);
