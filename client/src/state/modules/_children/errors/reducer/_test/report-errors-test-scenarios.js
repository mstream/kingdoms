// @flow

import {
    clientActions,
} from '../../../../actions';
import {
    emptyClientState,
} from '../../../../../state';
import type {
    ClientReportErrorsAction,
} from '../../actions/types';
import type {
    ClientStateErrorsReducerTestScenario,
} from './types';

type Scenarios = $ReadOnlyArray< ClientStateErrorsReducerTestScenario< ClientReportErrorsAction >, >;

export const reportErrorsTestScenarios: Scenarios = [
    {
        action: clientActions.errors.reportErrors(
            [
                `error1`,
                `error2`,
            ],
        ),
        expectedLocalStateCreator: (
            {
                previousLocalState,
            },
        ) => {

            return [
                ...previousLocalState,
                `error1`,
                `error2`,
            ];

        },
        name               : `reports errors`,
        previousGlobalState: {
            ...emptyClientState,
            errors: [],
        },
    },
];
