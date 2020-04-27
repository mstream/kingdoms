// @flow

import {
    emptyCommonState,
} from '../../../../state';
import {
    executeTimeStep,
} from '../../../cities/actions';
import {
    failure, success,
} from '../../../../utils';
import type {
    CommonExecuteTimeStepAction,
} from '../../actions';
import type {
    CommonStateTimeReducerTestScenarios,
} from './types';

type Scenario = CommonStateTimeReducerTestScenarios< CommonExecuteTimeStepAction >;
type Scenarios = $ReadOnlyArray< Scenario >;

export const executeTimeStepTestScenarios: Scenarios = [
    {
        action: executeTimeStep(
            {
                time: `2000-01-01T01:00:00Z`,
            },
        ),
        expectedReductionResultCreator: () => {

            return success(
                {
                    state: `2000-01-01T01:00:00Z`,
                },
            );

        },
        name               : `updates time`,
        previousGlobalState: {
            ...emptyCommonState,
            time: `2000-01-01T00:00:00Z`,
        },
    },
    {
        action: executeTimeStep(
            {
                time: `2000-01-01T01:00:00Z`,
            },
        ),
        expectedReductionResultCreator: () => {

            return failure(
                {
                    errors: [
                        `the time from the action is not past the time from the state`,
                    ],
                },
            );

        },
        name               : `previous time newer than the one from action`,
        previousGlobalState: {
            ...emptyCommonState,
            time: `2000-01-01T02:00:00Z`,
        },
    },
    {
        action: executeTimeStep(
            {
                time: `INVALID_FORMAT_TIME`,
            },
        ),
        expectedReductionResultCreator: () => {

            return failure(
                {
                    errors: [
                        `time does not have a valid format`,
                    ],
                },
            );

        },
        name               : `time with invalid format`,
        previousGlobalState: {
            ...emptyCommonState,
            time: `2000-01-01T02:00:00Z`,
        },
    },
];
