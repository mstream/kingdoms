// @flow

import {
    emptyCommonState,
} from '../../../../../../../../common/src/state/modules/state';
import {
    emptyCityState,
} from '../../../../../../../../common/src/state/modules/cities/reducer/state';
import type {
    ClientStateCommonStateReducerTestScenario,
} from './types';
import type {
    ClientUpdateStateAction,
} from '../../actions/types';
import {
    emptyClientState,
} from '../../../../../state';
import {
    clientActions,
} from '../../../../actions';

type Scenarios = $ReadOnlyArray< ClientStateCommonStateReducerTestScenario< ClientUpdateStateAction >, >;

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
        expectedLocalStateCreator: () => {

            return {
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
            };

        },
        name               : `updates state`,
        previousGlobalState: {
            ...emptyClientState,
        },
    },
];
