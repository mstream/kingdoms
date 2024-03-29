// @flow

import {
    TAB_OVERVIEW,
} from '../types';
import {
    UNIT_PEASANT,
} from '../../../../../../../../../../common/src/state/modules/_children/rules/reducer/types';
import type {
    ClientCloseCityViewAction,
} from '../../actions/types';
import type {
    ClientStateActionReducer,
} from '../../../../../types';
import type {
    ClientStateMenu,
} from '../types';

type Reducer = ClientStateActionReducer< ClientStateMenu,
    ClientCloseCityViewAction, >;

export const closeCityViewMenuReducer: Reducer = (
    {
        localState,
    },
) => {

    return {
        ...localState,
        cityView: {
            ...localState.cityView,
            currentCityId: null,
            tab          : TAB_OVERVIEW,
            unit         : UNIT_PEASANT,
        },
    };

};
