// @flow

import {
    UNIT_PIKEMAN,
} from '../../../../../../../../common/src/state/modules/rules/reducer/types';
import {
    emptyClientState,
} from '../../../../../state';
import {
    emptyRegimentTemplateState,
} from '../../../../../../../../common/src/state/modules/orders/reducer/state';
import {
    menuActions,
} from '../../actions';
import type {
    ClientCloseAttackViewAction,
} from '../../actions/types';
import type {
    ClientStateMenuReducerTestScenario,
} from './types';

type Scenarios = $ReadOnlyArray< ClientStateMenuReducerTestScenario< ClientCloseAttackViewAction >, >;

export const closeAttackViewTestScenarios: Scenarios = [
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
