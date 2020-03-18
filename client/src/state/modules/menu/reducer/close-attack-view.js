// @flow

import type { ClientStateMenu } from './types';
import type { ClientCloseAttackViewAction } from '../actions';
import type { ClientState } from '../../types';

export const closeAttackViewMenuReducer = (
    {
        localState,
        action,
        globalState,
    }:
        {
            localState: ClientStateMenu,
            action: ClientCloseAttackViewAction,
            globalState: ClientState,
        },
): ClientStateMenu => {
    return {
        ...localState,
        attackView: {
            ...localState.attackView,
            attackedCityId: null,
            attackingCityId: null,
            regimentTemplate: {},
        },
    };
};
