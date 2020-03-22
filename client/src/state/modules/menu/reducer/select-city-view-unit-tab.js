// @flow

import type { ClientStateMenu } from './types';
import type { ClientState } from '../../types';
import type { ClientSelectCityViewUnitsTabAction } from '../actions/types';

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
