// @flow

import type { ClientState, ClientStateMenu } from '../../state';
import type {
    ClientSelectCityViewTabAction,
    ClientSelectCityViewUnitAction,
} from '../../actions';

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
