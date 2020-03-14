// @flow

import type {
    ClientSelectCityViewTabAction,
    ClientSelectCityViewUnitAction,
} from '../../../actions';
import type { ClientStateMenu } from './types';
import type { ClientState } from '../../root';

export const selectCityViewUnitMenuReducer = (
    {
        localState,
        action,
        globalState,
    }:
        {
            localState: ClientStateMenu,
            action: ClientSelectCityViewUnitAction,
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
