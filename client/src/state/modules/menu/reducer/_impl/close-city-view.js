// @flow

import type { ClientStateMenu } from '../types';
import { TAB_OVERVIEW } from '../types';
import { UNIT_PEASANT } from '../../../../../../../common/src/state/modules/rules/reducer/types';
import type { ClientState, ClientStateActionReducer } from '../../../types';
import type {
    ClientCloseAttackViewAction,
    ClientCloseCityViewAction,
} from '../../actions/types';

type Reducer = ClientStateActionReducer<ClientStateMenu, ClientCloseCityViewAction>;


export const closeCityViewMenuReducer: Reducer = (
    {
        localState,
        action,
        globalState,
    }
)=> {
    return {
        ...localState,
        cityView: {
            ...localState.cityView,
            currentCityId: null,
            unit: UNIT_PEASANT,
            tab: TAB_OVERVIEW,
        },
    };
};
