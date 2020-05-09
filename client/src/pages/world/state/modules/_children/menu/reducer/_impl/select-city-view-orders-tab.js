// @flow

import type {
    ClientSelectCityViewOrdersTabAction,
} from '../../actions/types';
import type {
    ClientStateActionReducer,
} from '../../../../../types';
import type {
    ClientStateMenu,
} from '../types';

type Reducer = ClientStateActionReducer< ClientStateMenu,
    ClientSelectCityViewOrdersTabAction, >;

export const selectCityViewOrdersTabMenuReducer: Reducer = (
    {
        localState,
        action,

    },
) => {

    return {
        ...localState,
        cityView: {
            ...localState.cityView,
            orderId: action.payload.orderId,
        },
    };

};
