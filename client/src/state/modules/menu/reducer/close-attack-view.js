// @flow

import type { ClientCloseAttackViewAction } from '../../../actions';
import type { ClientStateMenu } from './types';
import { initialClientState } from '../../root';
import type { ClientState } from '../../root';

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
