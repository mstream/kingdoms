// @flow

import {
    clientActions,
} from '../../../../actions';
import {
    emptyCityState,
} from '../../../../../../../../../../common/src/state/modules/_children/cities/reducer';
import {
    emptyClientState,
} from '../../../../../state';
import {
    emptyCommonState,
} from '../../../../../../../../../../common/src/state/modules/state';
import type {
    ClientStateTilesReducerTestScenario,
} from './types';
import type {
    ClientUpdateStateAction,
} from '../../../common-state/actions/types';

type Scenario = ClientStateTilesReducerTestScenario< ClientUpdateStateAction >;
type Scenarios = $ReadOnlyArray< Scenario >;

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
