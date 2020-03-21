// @flow

import { executeTimeStep } from '../../../cities/actions';
import { failure, success } from '../../../utils';
import { emptyCommonState } from '../../../state';
import type { CommonExecuteTimeStepAction } from '../../actions';
import type { CommonStateTimeReducerTestScenarios } from './types';

type Scenarios = $ReadOnlyArray<CommonStateTimeReducerTestScenarios<CommonExecuteTimeStepAction>>;

export const executeTimeStepTestScenarios: Scenarios = [
    {
        name: `updates time`,
        action: executeTimeStep({ time: '2000-01-01T01:00:00Z' }),
        previousGlobalState: {
            ...emptyCommonState,
            time: '2000-01-01T00:00:00Z',
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return success({
                state: '2000-01-01T01:00:00Z',
            });
        },
    },
    {
        name: `previous time newer than the one from action`,
        action: executeTimeStep({ time: '2000-01-01T01:00:00Z' }),
        previousGlobalState: {
            ...emptyCommonState,
            time: '2000-01-01T02:00:00Z',
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return failure(
                {
                    errors: [`the time from the action is not past the time from the state`],
                },
            );
        },
    },
    {
        name: `time with invalid format`,
        action: executeTimeStep({ time: 'INVALID_FORMAT_TIME' }),
        previousGlobalState: {
            ...emptyCommonState,
            time: '2000-01-01T02:00:00Z',
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return failure(
                {
                    errors: [`time does not have a valid format`],
                },
            );
        },
    },
];
