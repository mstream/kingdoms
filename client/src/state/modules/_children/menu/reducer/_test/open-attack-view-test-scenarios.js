// @flow

import { emptyCommonState } from '../../../../../../../../common/src/state/modules/state';
import { emptyCityState } from '../../../../../../../../common/src/state/modules/cities/reducer/state';
import type { ClientStateMenuReducerTestScenario } from './types';
import type { ClientOpenAttackViewAction } from '../../actions/types';
import { emptyClientState } from '../../../../../state';
import { clientActions } from '../../../../actions';

export const openAttackViewTestScenarios: $ReadOnlyArray<
    ClientStateMenuReducerTestScenario<ClientOpenAttackViewAction>,
> = [
    {
        name: 'opens attack view',
        action: clientActions.menu.openAttackView({
            cityId: 'city2',
        }),
        previousGlobalState: {
            ...emptyClientState,
            player: {
                name: 'player1',
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    city1: {
                        ...emptyCityState,
                        ownerId: 'player1',
                    },
                    city2: {
                        ...emptyCityState,
                        ownerId: 'player2',
                    },
                },
            },
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackedCityId: null,
                },
            },
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
                attackView: {
                    ...previousLocalState.attackView,
                    attackedCityId: 'city2',
                },
            };
        },
    },
];
