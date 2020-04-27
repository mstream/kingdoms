// @flow

import {
    OPEN_ATTACK_VIEW,
} from './types';

import type {
    ClientActionCreator,
} from '../../../../../../types';
import type {
    ClientOpenAttackViewAction,
} from './types';

type ActionCreator = ClientActionCreator< ClientOpenAttackViewAction >;

export const openAttackView: ActionCreator = (
    payload,
) => {

    return {
        payload,
        type: OPEN_ATTACK_VIEW,
    };

};
