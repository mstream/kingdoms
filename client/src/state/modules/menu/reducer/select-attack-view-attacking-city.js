// @flow

import type { ClientStateMenu } from './types';
import type { ClientStateActionReducer } from '../../types';
import type { ClientSelectAttackViewAttackingCityAction } from '../actions/types';

type Reducer = ClientStateActionReducer<ClientStateMenu, ClientSelectAttackViewAttackingCityAction>;


export const selectAttackViewAttackingCityReducer: Reducer = (
    {
        localState,
        action,
        globalState,
    },
) => {
    return {
        ...localState,
        attackView: {
            ...localState.attackView,
            attackingCityId: action.payload.cityId,
        },
    };
};
