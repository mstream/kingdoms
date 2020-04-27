// @flow

import type {
    ClientSelectCityViewResourcesTabAction,
} from '../../actions/types';
import type {
    ClientStateActionReducer,
} from '../../../../../types';
import type {
    ClientStateMenu,
} from '../types';

type Reducer = ClientStateActionReducer< ClientStateMenu,
    ClientSelectCityViewResourcesTabAction, >;

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
