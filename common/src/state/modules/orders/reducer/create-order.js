// @flow

import type { CommonStateActionReducer } from '../../types';
import { failure, success } from '../../utils';
import type { CommonCreateOrderAction } from '../actions/types';
import type { CommonStateOrders } from './types';
import { commonStateTimeSelectors } from '../../time/selectors';

type Reducer = CommonStateActionReducer<CommonStateOrders, CommonCreateOrderAction>;

export const createOrderOrdersReducer: Reducer = (
    {
        action,
        globalState,
        localState,
    },
) => {
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
            creationTime: commonStateTimeSelectors.time(globalState),
            minimumDelay: action.payload.minimumDelay,
            originCityId: action.payload.originCityId,
            regimentTemplate: action.payload.regimentTemplate,
            targetCityId: action.payload.targetCityId,
        },
    };

    return success({ state: newState });
};
