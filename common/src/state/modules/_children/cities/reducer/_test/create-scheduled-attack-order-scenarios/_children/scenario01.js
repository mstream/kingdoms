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
    ordersActions,
} from '../../../../../orders/actions';
import {
    success,
} from '../../../../../../utils';
import type {
    Scenario,
} from '../types';

export const scenario01: Scenario = {
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
    expectedReductionResultCreator: (
        {
            previousLocalState,
        },
    ) => {

        return success(
            {
                state: {
                    ...previousLocalState,
                },
            },
        );

    },
    name               : `accepts a valid order`,
    previousGlobalState: {
        ...emptyCommonState,
        cities: {
            ...emptyCommonState.cities,
            city1: {
                ...emptyCityState,
                ownerId: `player1`,
            },
            city2: {
                ...emptyCityState,
                ownerId: `player2`,
            },
        },
    },
};
