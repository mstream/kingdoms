// @flow

import {
    emptyCommonState,
} from '../../../../../../../../common/src/state/modules/state';
import {
    emptyCityState,
} from '../../../../../../../../common/src/state/modules/cities/reducer/state';
import type {
    ClientStateTilesReducerTestScenario,
} from './types';
import type {
    ClientUpdateStateAction,
} from '../../../common-state/actions/types';
import {
    emptyClientState,
} from '../../../../../state';
import {
    clientActions,
} from '../../../../actions';

type Scenarios = $ReadOnlyArray< ClientStateTilesReducerTestScenario< ClientUpdateStateAction >, >;

export const updateStateTestScenarios: Scenarios = [
    {
        action: clientActions.commonState.updateState(
            {
                commonState: {
                    ...emptyCommonState,
                    cities: {
                        city1: {
                            ...emptyCityState,
                        },
                        city2: {
                            ...emptyCityState,
                        },
                    },
                    world: {
                        ...emptyCommonState.world,
                        size: {
                            x: 1,
                            y: 1,
                        },
                    },
                },
            },
        ),
        expectedLocalStateCreator: (
            {
                previousLocalState,
            },
        ) => {

            return {
                ...previousLocalState,
            };

        },
        name               : `updates state`,
        previousGlobalState: {
            ...emptyClientState,
        },
    },
];
