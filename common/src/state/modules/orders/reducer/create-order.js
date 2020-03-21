// @flow

import type { CommonState, CommonStateReducerResult } from '../../types';
import { failure, success } from '../../utils';
import type { CommonCreateOrderAction } from '../actions/types';
import type { CommonStateOrders } from './types';
import { commonStateTimeSelector } from '../../../../selectors/common-state';

export const createOrderOrdersReducer = (
    {
        action,
        globalState,
        localState,
    }: {
        action: CommonCreateOrderAction,
        globalState: CommonState,
        localState: CommonStateOrders,
    },
): CommonStateReducerResult<CommonStateOrders> => {
    const order = localState[action.payload.orderId];

    if (order != null) {
        return failure({
            errors: ['order with the same id already exists'],
        });
    }

    const newState = {
        ...localState,
        [action.payload.orderId]: {
            authorityId: action.payload.playerId,
            creationTime: commonStateTimeSelector(globalState),
            minimumDelay: action.payload.minimumDelay,
            originCityId: action.payload.originCityId,
            regimentTemplate: action.payload.regimentTemplate,
            targetCityId: action.payload.targetCityId,
        },
    };

    return success({ state: newState });
};
