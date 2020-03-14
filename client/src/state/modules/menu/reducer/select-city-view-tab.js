// @flow

import type { ClientStateMenu } from './types';
import type { ClientState } from '../../root';
import type { ClientSelectCityViewTabAction } from '../actions';

export const selectCityViewTabMenuReducer = (
    {
        localState,
        action,
        globalState,
    }:
        {
            localState: ClientStateMenu,
            action: ClientSelectCityViewTabAction,
            globalState: ClientState,
        },
): ClientStateMenu => {
    return {
        ...localState,
        cityView: {
            ...localState.cityView,
            tab: action.payload.tab,
        },
    };
};
