// @flow

import type {
    ClientStateMenu,
} from '../types';
import type {
    ClientSelectCityViewUnitsTabAction,
} from '../../actions/types';
import type {
    ClientStateActionReducer,
} from '../../../../../types';

type Reducer = ClientStateActionReducer< ClientStateMenu,
    ClientSelectCityViewUnitsTabAction, >;

export const selectCityViewUnitTabMenuReducer: Reducer = (
    {
        localState,
        action,

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
