// @flow

import {
    clientActions,
} from '../../../../actions';
import {
    emptyClientState,
} from '../../../../../state';
import type {
    ClientStateErrorsReducerTestScenario,
} from './types';
import type {
    ClientSucceedWorldsUpdateAction,
} from '../../actions/types';

type Scenario = ClientStateErrorsReducerTestScenario< ClientSucceedWorldsUpdateAction >;
type Scenarios = $ReadOnlyArray< Scenario >;

export const succeedWorldsUpdateTestScenarios: Scenarios = [
    {
        action: clientActions.worlds.succeedWorldsUpdate(
            [
                `world1`,
                `world2`,
            ],
        ),
        expectedLocalStateCreator: (
            {
                previousLocalState,
            },
        ) => {

            return {
                ...previousLocalState,
                isLoading: false,
                items    : [
                    `world1`,
                    `world2`,
                ],
            };

        },
        name               : `requests worlds update`,
        previousGlobalState: {
            ...emptyClientState,
            worlds: {
                isLoading: true,
                items    : [],
            },
        },
    },
];
