// @flow

import type { ClientAction, ClientDummyAction } from '../../actions';
import { dummy } from '../../actions';
import { cameraReducer } from './index';
import { zoomCameraTestScenarios } from './zoom-camera-test-scenarios';
import { updateStateTestScenarios } from './update-state-test-scenarios';
import { moveCameraTestScenarios } from './move-camera-test-scenarios';
import { emptyClientState } from '../types';
import { initialClientState } from '../root';
import { zeroVector } from '../../../../../common/src/vector';
import type { ClientStateCameraReducerTestScenario } from './types';

const runScenarios = ({ scenarios }: { scenarios: $ReadOnlyArray<ClientStateCameraReducerTestScenario<ClientAction>> }): void => {
    scenarios.forEach(
        (scenario) => {
            it(scenario.name, () => {
                const previousLocalState = scenario.previousGlobalState.camera;
                const actual = cameraReducer(previousLocalState, scenario.action, scenario.previousGlobalState);
                const expectedLocalState = scenario.expectedLocalStateCreator({ previousLocalState });
                expect(actual).toEqual(expectedLocalState);
            });
        },
    );
};

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
    // $FlowFixMe
    runScenarios({
        scenarios: [
            stateInitializationScenario,
            ...moveCameraTestScenarios,
            ...updateStateTestScenarios,
            ...zoomCameraTestScenarios,
        ],
    });
});
