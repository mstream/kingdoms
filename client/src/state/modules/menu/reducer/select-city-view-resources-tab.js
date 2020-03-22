// @flow

import type { ClientStateMenu } from './types';
import type { ClientState } from '../../types';
import type { ClientSelectCityViewResourceTabAction } from '../actions/types';

export const selectCityViewResourcesTabMenuReducer = (
    {
        localState,
        action,
        globalState,
    }:
        {
            localState: ClientStateMenu,
            action: ClientSelectCityViewResourceTabAction,
            globalState: ClientState,
        },
): ClientStateMenu => {
    return {
        ...localState,
        cityView: {
            ...localState.cityView,
            resource: action.payload.resourceType,
        },
    };
};
