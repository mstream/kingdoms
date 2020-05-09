// @flow

import {
    clientActions,
} from '../../../../actions';
import {
    emptyCityState,
} from '../../../../../../../../../../common/src/state/modules/_children/cities/reducer/state';
import {
    emptyClientState,
} from '../../../../../state';
import {
    emptyCommonState,
} from '../../../../../../../../../../common/src/state/modules/state';
import type {
    ClientStateCommonStateReducerTestScenario,
} from './types';
import type {
    ClientUpdateStateAction,
} from '../../actions/types';

type Scenario = ClientStateCommonStateReducerTestScenario< ClientUpdateStateAction >;
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
