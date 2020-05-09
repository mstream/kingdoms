// @flow

import type {
    ClientSelectCityViewTabAction,
} from '../../actions/types';
import type {
    ClientStateActionReducer,
} from '../../../../../types';
import type {
    ClientStateMenu,
} from '../types';

type Reducer = ClientStateActionReducer< ClientStateMenu,
    ClientSelectCityViewTabAction, >;

export const selectCityViewTabMenuReducer: Reducer = (
    {
        localState,
        action,
    },
) => {

    return {
        ...localState,
        cityView: {
            ...localState.cityView,
            tab: action.payload.tab,
        },
    };

};
