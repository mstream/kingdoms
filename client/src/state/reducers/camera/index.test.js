// @flow

import type { ClientAction, ClientDummyAction } from '../../actions';
import { dummy } from '../../actions';
import { emptyClientState, initialClientState } from '../../state';
import type { ClientStateCameraReducerTestScenario } from './index';
import { cameraReducer } from './index';
import { zoomCameraTestScenarios } from './zoom-camera-test-scenarios';
import { updateStateTestScenarios } from './update-state-test-scenarios';
import { moveCameraTestScenarios } from './move-camera-test-scenarios';

const runScenarios = ({ scenarios }: { scenarios: $ReadOnlyArray<ClientStateCameraReducerTestScenario<ClientAction>> }): void => {
    scenarios.forEach(
        (scenario) => {
            it(scenario.name, () => {
                const previousLocalState = scenario.previousGlobalState.camera;
                const actual = cameraReducer(scenario.previousGlobalState.camera, scenario.action, scenario.previousGlobalState);
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
            ...initialClientState.camera,
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
