// @flow

import {
    CLOSE_ATTACK_VIEW,
} from './types';
import type {
    ClientActionCreator,
} from '../../../../../../types';
import type {
    ClientCloseAttackViewAction,
} from './types';

type ActionCreator = ClientActionCreator< ClientCloseAttackViewAction >;

export const closeAttackView: ActionCreator = () => {

    return {
        payload: undefined,
        type   : CLOSE_ATTACK_VIEW,
    };

};
