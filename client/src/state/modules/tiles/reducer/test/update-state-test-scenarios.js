// @flow


import { updateState } from '../../../common-state/actions';
import { emptyCommonState } from '../../../../../../../common/src/state/modules/state';
import { emptyCityState } from '../../../../../../../common/src/state/modules/cities/reducer/state';
import type { ClientStateTilesReducerTestScenario } from './types';
import type { ClientUpdateStateAction } from '../../../common-state/actions/types';
import { emptyClientState } from '../../../state';


export const updateStateTestScenarios: $ReadOnlyArray<ClientStateTilesReducerTestScenario<ClientUpdateStateAction>> = [
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
                ...previousLocalState,
            };
        },
    },
];
