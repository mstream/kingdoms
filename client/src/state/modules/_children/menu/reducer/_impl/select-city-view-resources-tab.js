// @flow

import type {
    ClientStateMenu,
} from '../types';
import type {
    ClientSelectCityViewResourceTabAction,
} from '../../actions/types';
import type {
    ClientStateActionReducer,
} from '../../../../../types';

type Reducer = ClientStateActionReducer< ClientStateMenu,
    ClientSelectCityViewResourceTabAction, >;

export const selectCityViewResourcesTabMenuReducer: Reducer = (
    {
        localState,
        action,

    },
) => {

    return {
        ...localState,
        cityView: {
            ...localState.cityView,
            resource: action.payload.resourceType,
        },
    };

};
