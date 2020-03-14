// @flow

import type { ClientStateMenu } from './types';
import { initialClientState } from '../../root';
import type { ClientState } from '../../root';
import type { ClientCloseAttackViewAction } from '../actions';

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
