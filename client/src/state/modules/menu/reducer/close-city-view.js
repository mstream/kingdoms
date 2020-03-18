// @flow

import type { ClientStateMenu } from './types';
import { TAB_OVERVIEW } from './types';
import type { ClientCloseCityViewAction } from '../actions';
import { UNIT_PEASANT } from '../../../../../../common/src/state/modules/rules/reducer/types';
import type { ClientState } from '../../types';

export const closeCityViewMenuReducer = (
    {
        localState,
        action,
        globalState,
    }:
        {
            localState: ClientStateMenu,
            action: ClientCloseCityViewAction,
            globalState: ClientState,
        },
): ClientStateMenu => {
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
