// @flow

import { emptyClientState } from '../../types';
import type { ClientStateMenuReducerTestScenario } from './types';
import type { ClientCloseAttackViewAction } from '../actions';
import { closeAttackView } from '../actions';
import { UNIT_PIKEMAN } from '../../../../../../common/src/state/modules/rules/reducer/types';
import { emptyRegimentTemplateState } from '../../../../../../common/src/state/modules/orders/reducer/state';


export const closeAttackViewTestScenarios: $ReadOnlyArray<ClientStateMenuReducerTestScenario<ClientCloseAttackViewAction>> = [
    {
        name: 'closes attack view',
        action: closeAttackView(),
        previousGlobalState: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackedCityId: 'city1',
                    attackingCityId: 'city2',
                    regimentTemplate: {
                        ...emptyRegimentTemplateState,
                        [UNIT_PIKEMAN]: {
                            from: 10,
                            to: 100,
                        },
                    },
                },
            },
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
                attackView: emptyClientState.menu.attackView,
            };
        },
    },
];
