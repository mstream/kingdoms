// @flow

import {
    UNIT_PIKEMAN,
} from '../../../../../../../../common/src/state/modules/rules/reducer/types';
import {
    emptyRegimentTemplateState,
} from '../../../../../../../../common/src/state/modules/orders/reducer/state';
import type {
    ClientStateMenuReducerTestScenario,
} from './types';
import type {
    ClientCloseAttackViewAction,
} from '../../actions/types';
import {
    emptyClientState,
} from '../../../../../state';
import {
    menuActions,
} from '../../actions';

export const closeAttackViewTestScenarios: $ReadOnlyArray< ClientStateMenuReducerTestScenario< ClientCloseAttackViewAction >, > = [
    {
        action                   : menuActions.closeAttackView(),
        expectedLocalStateCreator: (
            {
                previousLocalState,
            },
        ) => {

            return {
                ...previousLocalState,
                attackView: emptyClientState.menu.attackView,
            };

        },
        name               : `closes attack view`,
        previousGlobalState: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackedCityId  : `city1`,
                    attackingCityId : `city2`,
                    regimentTemplate: {
                        ...emptyRegimentTemplateState,
                        [ UNIT_PIKEMAN ]: {
                            from: 10,
                            to  : 100,
                        },
                    },
                },
            },
        },
    },
];
