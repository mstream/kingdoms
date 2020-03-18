// @flow

import type { ClientStateMenu } from './types';
import type { ClientSelectCityViewUnitsTabAction } from '../actions';
import type { ClientState } from '../../types';

export const selectCityViewUnitTabMenuReducer = (
    {
        localState,
        action,
        globalState,
    }:
        {
            localState: ClientStateMenu,
            action: ClientSelectCityViewUnitsTabAction,
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
