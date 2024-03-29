// @flow

import {
    commonStateSelectors,
} from '../../../../selectors';
import {
    failure, success,
} from '../../../../utils';
import type {
    CommonCreateScheduledAttackOrderAction,
} from '../../actions/types';
import type {
    CommonStateActionReducer,
} from '../../../../types';
import type {
    CommonStateOrders,
} from '../types';

type Reducer = CommonStateActionReducer< CommonStateOrders,
    CommonCreateScheduledAttackOrderAction, >;

export const createScheduledAttackOrderOrdersReducer: Reducer = (
    {
        action,
        globalState,
        localState,
    },
) => {

    const {
        minimumDelay,
        orderId,
        originCityId,
        playerId,
        regimentTemplate,
        targetCityId,
    } = action.payload;

    if ( localState.items.scheduledAttack[ orderId ] != null ) {

        return failure(
            {
                errors: [
                    `order with the same id already exists`,
                ],
            },
        );

    }

    const currentTime = commonStateSelectors.time.time(
        globalState,
    );

    const newCreationTimes = {
        ...localState.creationTimes,
        [ orderId ]: currentTime,
    };

    const newItemsState = {
        ...localState.items,
        scheduledAttack: {
            ...localState.items.scheduledAttack,
            [ orderId ]: {
                minimumDelay,
                originCityId,
                regimentTemplate,
                targetCityId,
            },
        },
    };

    const newOwnershipsState = {
        ...localState.ownerships,
        [ orderId ]: playerId,
    };

    const newState = {
        ...localState,
        creationTimes: newCreationTimes,
        items        : newItemsState,
        ownerships   : newOwnershipsState,
    };

    return success(
        {
            state: newState,
        },
    );

};
