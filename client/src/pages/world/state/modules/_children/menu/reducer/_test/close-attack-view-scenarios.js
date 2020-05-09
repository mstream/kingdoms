// @flow

import {
    UNIT_PIKEMAN,
} from '../../../../../../../../../../common/src/state/modules/_children/rules/reducer/types';
import {
    emptyClientState,
} from '../../../../../state';
import {
    emptyRegimentTemplateState,
} from '../../../../../../../../../../common/src/state/modules/_children/orders/reducer';
import {
    menuActions,
} from '../../actions';
import type {
    ClientCloseAttackViewAction,
} from '../../actions/types';
import type {
    ClientStateMenuReducerTestScenario,
} from './types';

type Scenario =
    ClientStateMenuReducerTestScenario< ClientCloseAttackViewAction >;

type Scenarios = $ReadOnlyArray< Scenario >;

export const closeAttackViewScenarios: Scenarios = [
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
