// @flow


import {
    UNIT_PIKEMAN,
} from '../../../../../rules/reducer/types';
import {
    emptyCityState,
} from '../../../state';
import {
    emptyCommonState,
} from '../../../../../../state';
import {
    emptyRegimentTemplateState,
} from '../../../../../orders/reducer/state';
import {
    failure,
} from '../../../../../../utils';
import {
    ordersActions,
} from '../../../../../orders/actions';
import type {
    Scenario,
} from '../types';

export const scenario02: Scenario = {
    action: ordersActions.createScheduledAttackOrder(
        {
            minimumDelay    : 10,
            orderId         : `order1`,
            originCityId    : `city1`,
            playerId        : `player1`,
            regimentTemplate: {
                ...emptyRegimentTemplateState,
                [ UNIT_PIKEMAN ]: {
                    from: 10,
                    to  : 20,
                },
            },
            targetCityId: `city2`,
        },
    ),
    expectedReductionResultCreator: () => {

        return failure(
            {
                errors: [
                    `the origin city does not exist`,
                ],
            },
        );

    },
    name               : `fails when the origin city does not exist`,
    previousGlobalState: {
        ...emptyCommonState,
        cities: {
            ...emptyCommonState.cities,
            city2: {
                ...emptyCityState,
                ownerId: `player2`,
            },
        },
    },
};
