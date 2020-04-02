// @flow

import type { CommonStateOrdersReducerTestScenarios } from './types';
import type { CommonExecuteTimeStepAction } from '../../../time/actions';

type Scenarios = $ReadOnlyArray<
    CommonStateOrdersReducerTestScenarios<CommonExecuteTimeStepAction>,
>;

export const executeTimeStepTestScenarios: Scenarios = [
    // {
    //     name: `updates time`,
    //     action: executeTimeStep({ time: '2000-01-01T01:00:00Z' }),
    //     previousGlobalState: {
    //         ...emptyCommonState,
    //         orders: {},
    //     },
    //     expectedReductionResultCreator: ({ previousLocalState }) => {
    //         return success({
    //             state: '2000-01-01T01:00:00Z',
    //         });
    //     },
    // },
    // {
    //     name: `previous time newer than the one from action`,
    //     action: executeTimeStep({ time: '2000-01-01T01:00:00Z' }),
    //     previousGlobalState: {
    //         ...emptyCommonState,
    //         time: '2000-01-01T02:00:00Z',
    //     },
    //     expectedReductionResultCreator: ({ previousLocalState }) => {
    //         return failure(
    //             {
    //                 errors: [`the time from the action is not past the time from the state`],
    //             },
    //         );
    //     },
    // },
];
