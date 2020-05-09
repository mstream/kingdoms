// @flow

import {
    SELECT_ATTACK_VIEW_ATTACKING_CITY,
} from './types';
import type {
    ClientActionCreator,
} from '../../../../../../types';
import type {
    ClientSelectAttackViewAttackingCityAction,
} from './types';

type ActionCreator = ClientActionCreator< ClientSelectAttackViewAttackingCityAction >;

export const selectAttackViewAttackingCity: ActionCreator = (
    payload,
) => {

    return {
        payload,
        type: SELECT_ATTACK_VIEW_ATTACKING_CITY,
    };

};
