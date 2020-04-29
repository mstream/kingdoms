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

export const scenario03: Scenario = {
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
                    `the origin city does not belong to the player`,
                ],
            },
        );

    },
    name               : `fails when the origin city does not belong to the player`,
    previousGlobalState: {
        ...emptyCommonState,
        cities: {
            ...emptyCommonState.cities,
            city1: {
                ...emptyCityState,
                ownerId: `player2`,
            },
            city2: {
                ...emptyCityState,
                ownerId: `player2`,
            },
        },
    },
};
