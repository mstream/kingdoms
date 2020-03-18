// @flow

import type { ClientStateMenu } from './types';
import type { ClientSelectCityViewResourceTabAction } from '../actions';
import type { ClientState } from '../../types';

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
