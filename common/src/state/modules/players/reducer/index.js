// @flow

import type { CommonStatePlayers } from './types';
import { createCityPlayersReducer } from './create-city';
import { unsupportedActionReducer } from '../../unsupported-action-reducer';
import { initialCommonState } from '../../../index';
import type { CommonState, CommonStateReducerResult } from '../../types';
import { RESET_STATE } from '../../../actions/types';
import type { CommonAction } from '../../../types';
import { CREATE_CITY } from '../../cities/actions/types';
import { resetStatePlayersReducer } from './reset-state';
import { CREATE_ORDER } from '../../orders/actions/types';
import { createOrderPlayersReducer } from './create-order';

export const playersReducer = (
    localState: CommonStatePlayers = initialCommonState.players,
    action: CommonAction,
    globalState: CommonState,
): CommonStateReducerResult<CommonStatePlayers> => {
    switch (action.type) {
        case CREATE_CITY: {
            return createCityPlayersReducer({
                action,
                globalState,
                localState,
            });
        }
        case CREATE_ORDER: {
            return createOrderPlayersReducer({
                action,
                globalState,
                localState,
            });
        }
        case RESET_STATE: {
            return resetStatePlayersReducer({
                action,
                globalState,
                localState,
            });
        }
        default: {
            return unsupportedActionReducer({
                action,
                globalState,
                localState,
            });
        }
    }
};

