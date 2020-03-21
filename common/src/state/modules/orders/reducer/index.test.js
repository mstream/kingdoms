// @flow

import { initialCommonState } from '../../../index';
import { resetStateTestScenarios } from './test/reset-state-test-scenarios';
import { executeTimeStepTestScenarios } from './test/execute-time-step-test-scenarios';
import { success } from '../../utils';
import { emptyCommonState } from '../../state';
import type { CommonDummyAction } from '../../../actions/types';
import type { CommonStateOrdersReducerTestScenarios } from './test/types';
import { ordersReducer } from './index';
import { dummy } from '../../../actions';
import { createOrderTestScenarios } from './test/create-order-test-scenarios';
import type { CommonAction } from '../../../types';

const runScenarios = (
    {
        scenarios,
    }: {
        scenarios: $ReadOnlyArray<CommonStateOrdersReducerTestScenarios<CommonAction>>
    },
): void => {
    scenarios.forEach(
        (scenario) => {
            it(scenario.name, () => {
                const previousLocalState = scenario.previousGlobalState.orders;

                const actual = ordersReducer(
                    previousLocalState,
                    scenario.action,
                    scenario.previousGlobalState,
                );

                const expectedReductionResult = scenario.expectedReductionResultCreator({ previousLocalState });

                expect(actual).toEqual(expectedReductionResult);
            });
        },
    );
};

const stateInitializationScenario: CommonStateOrdersReducerTestScenarios<CommonDummyAction> = {
    name: 'initializes its state',
    action: dummy(),
    previousGlobalState: {
        ...emptyCommonState,
        // $FlowFixMe
        time: undefined,
    },
    expectedReductionResultCreator: ({ previousLocalState }) => {
        return success({ state: initialCommonState.orders });
    },
};

describe('ordersReducer', () => {
    runScenarios({
        scenarios: [
            stateInitializationScenario,
            ...createOrderTestScenarios,
            ...executeTimeStepTestScenarios,
            ...resetStateTestScenarios,
        ],
    });
});
