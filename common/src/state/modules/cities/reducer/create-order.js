// @flow

import type { CommonStateCities } from './types';
import type { CommonState, CommonStateReducerResult } from '../../types';
import { failure, success } from '../../utils';
import type { CommonCreateOrderAction } from '../../orders/actions/types';

export const createOrderCitiesReducer = (
    {
        action,
        globalState,
        localState,
    }:
        {
            action: CommonCreateOrderAction,
            globalState: CommonState,
            localState: CommonStateCities,
        }): CommonStateReducerResult<CommonStateCities> => {
    const { originCityId, playerId, targetCityId } = action.payload;

    const originCity = localState[originCityId];
    const targetCity = localState[targetCityId];

    if (originCity == null) {
        return failure({ errors: ['the origin city does not exist'] });
    }

    if (targetCity == null) {
        return failure({ errors: ['the target city does not exist'] });
    }

    if (originCity.ownerId !== playerId) {
        return failure({ errors: ['the origin city does not belong to the player'] });
    }

    return success({ state: localState });
};
