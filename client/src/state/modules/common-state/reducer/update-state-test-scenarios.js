// @flow



import { emptyClientState } from '../../types';
import type { ClientStateCommonStateReducerTestScenario } from './types';
import { updateState } from '../actions';
import type { ClientUpdateStateAction } from '../actions';
import { emptyCommonState } from '../../../../../../common/src/state/modules/state';
import { emptyCityState } from '../../../../../../common/src/state/modules/cities/reducer/state';


export const updateStateTestScenarios: $ReadOnlyArray<ClientStateCommonStateReducerTestScenario<ClientUpdateStateAction>> = [
    {
        name: 'updates state',
        action: updateState({
            commonState: {
                ...emptyCommonState,
                cities: {
                    'city1': {
                        ...emptyCityState,
                    },
                    'city2': {
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
        }),
        previousGlobalState: {
            ...emptyClientState,
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...emptyCommonState,
                cities: {
                    'city1': {
                        ...emptyCityState,
                    },
                    'city2': {
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
    },
];
