// @flow

import {
    UNIT_PIKEMAN,
} from '../../../../../../../../common/src/state/modules/_children/rules/reducer/types';
import {
    clientActions,
} from '../../../../actions';
import {
    emptyClientState,
} from '../../../../../state';
import {
    emptyRegimentTemplateState,
} from '../../../../../../../../common/src/state/modules/_children/orders/reducer/state';
import type {
    ClientRequestOrderCreationAction,
} from '../../../common-state/actions/types';
import type {
    ClientStateMenuReducerTestScenario,
} from './types';

type Scenario = ClientStateMenuReducerTestScenario< ClientRequestOrderCreationAction >;
type Scenarios = $ReadOnlyArray< Scenario >;

export const requestOrderCreationTestScenarios: Scenarios = [
    {
        action: clientActions.commonState.requestOrderCreation(
            {
                minimumDelay    : 60,
                originCityId    : `city1`,
                regimentTemplate: {
                    ...emptyRegimentTemplateState,
                    [ UNIT_PIKEMAN ]: {
                        from: 100,
                        to  : 200,
                    },
                },
                targetCityId: `city2`,
            },
        ),
        expectedLocalStateCreator: (
            {
                previousLocalState,
            },
        ) => {

            return {
                ...previousLocalState,
                attackView: {
                    ...previousLocalState.attackView,
                    isSubmitting: true,
                },
            };

        },
        name               : `requests order creation`,
        previousGlobalState: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    isSubmitting: false,
                },
            },
        },
    },
];
