// @flow

import type { ClientStateMenu } from '../types';
import type { ClientStateActionReducer } from '../../../types';
import type { ClientSelectCityViewUnitsTabAction } from '../../actions/types';

type Reducer = ClientStateActionReducer<ClientStateMenu, ClientSelectCityViewUnitsTabAction>;


export const selectCityViewUnitTabMenuReducer: Reducer = (
    {
        localState,
        action,
        globalState,
    },
) => {
    return {
        ...localState,
        cityView: {
            ...localState.cityView,
            unit: action.payload.unitType,
        },
    };
};
