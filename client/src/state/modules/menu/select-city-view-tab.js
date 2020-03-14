// @flow

import type { ClientSelectCityViewTabAction } from '../../actions';
import type { ClientStateMenu } from './types';
import type { ClientState } from '../root';

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
