// @flow



import { emptyClientState } from '../../types';
import {
    emptyCityState,
    emptyCommonState,
} from '../../../../../../common/src/state';
import type { ClientStateCommonStateReducerTestScenario } from './types';
import { updateState } from '../actions';
import type { ClientUpdateStateAction } from '../actions';


export const updateStateTestScenarios: $ReadOnlyArray<ClientStateCommonStateReducerTestScenario<ClientUpdateStateAction>> = [
    {
        name: 'updates state',
        action: updateState({
            commonState: {
                ...emptyCommonState,
                cities: {
                    '1': {
                        ...emptyCityState,
                    },
                    '2': {
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
                    '1': {
                        ...emptyCityState,
                    },
                    '2': {
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