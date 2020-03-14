// @flow

import type { ClientStateMenu } from './types';
import type { ClientState } from '../../root';
import type { ClientSelectCityViewUnitTabTabAction } from '../actions';

export const selectCityViewUnitTabMenuReducer = (
    {
        localState,
        action,
        globalState,
    }:
        {
            localState: ClientStateMenu,
            action: ClientSelectCityViewUnitTabTabAction,
            globalState: ClientState,
        },
): ClientStateMenu => {
    return {
        ...localState,
        cityView: {
            ...localState.cityView,
            unit: action.payload.unitType,
        },
    };
};
