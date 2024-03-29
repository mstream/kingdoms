// @flow

import type {
    ClientSelectAttackViewAttackingCityAction,
} from '../../actions/types';
import type {
    ClientStateActionReducer,
} from '../../../../../types';
import type {
    ClientStateMenu,
} from '../types';

type Reducer = ClientStateActionReducer< ClientStateMenu,
    ClientSelectAttackViewAttackingCityAction, >;

export const selectAttackViewAttackingCityReducer: Reducer = (
    {
        localState,
        action,
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
