// @flow


import type { ClientUpdateStateAction } from '../../../actions';
import { updateState } from '../../../actions';
import { emptyClientState } from '../../types';
import type { ClientStateTilesReducerTestScenario } from './types';
import {
    emptyCityState,
    emptyCommonState,
} from '../../../../../../common/src/state';


export const updateStateTestScenarios: $ReadOnlyArray<ClientStateTilesReducerTestScenario<ClientUpdateStateAction>> = [
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
                ...previousLocalState,
            };
        },
    },
];
