// @flow

import type { ClientStateMenu } from '../types';
import type { ClientStateActionReducer } from '../../../types';
import type { ClientSelectCityViewTabAction } from '../../actions/types';

type Reducer = ClientStateActionReducer<ClientStateMenu, ClientSelectCityViewTabAction>;


export const selectCityViewTabMenuReducer: Reducer = (
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
            tab: action.payload.tab,
        },
    };
};
