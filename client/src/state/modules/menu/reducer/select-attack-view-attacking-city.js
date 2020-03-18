// @flow

import type { ClientStateMenu } from './types';
import type {
    ClientSelectAttackViewAttackingCityAction,
    ClientSelectCityViewUnitsTabAction,
} from '../actions';
import type { ClientState } from '../../types';

export const selectAttackViewAttackingCityReducer = (
    {
        localState,
        action,
        globalState,
    }:
        {
            localState: ClientStateMenu,
            action: ClientSelectAttackViewAttackingCityAction,
            globalState: ClientState,
        },
): ClientStateMenu => {
    return {
        ...localState,
        attackView: {
            ...localState.attackView,
            attackingCityId: action.payload.cityId,
        },
    };
};
