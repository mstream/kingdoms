// @flow

import type {
    ClientStateMenuReducerTestScenario,
} from './types';
import type {
    ClientRequestOrderCreationAction,
} from '../../../common-state/actions/types';
import {
    emptyClientState,
} from '../../../../../state';
import {
    clientActions,
} from '../../../../actions';
import {
    emptyRegimentTemplateState,
} from '../../../../../../../../common/src/state/modules/orders/reducer/state';
import {
    UNIT_PIKEMAN,
} from '../../../../../../../../common/src/state/modules/rules/reducer/types';

type Scenarios = $ReadOnlyArray< ClientStateMenuReducerTestScenario< ClientRequestOrderCreationAction >, >;

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
