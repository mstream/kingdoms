// @flow

import type { ClientStateMenu } from './types';
import type { ClientState } from '../../root';
import type { ClientSelectCityViewUnitsTabAction } from '../actions';

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
