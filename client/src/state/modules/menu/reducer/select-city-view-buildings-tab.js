// @flow

import type { ClientStateMenu } from './types';
import type {
    ClientSelectCityViewBuildingsTabAction,
    ClientSelectCityViewResourceTabAction,
} from '../actions';
import type { ClientState } from '../../types';

export const selectCityViewBuildingsTabMenuReducer = (
    {
        localState,
        action,
        globalState,
    }:
        {
            localState: ClientStateMenu,
            action: ClientSelectCityViewBuildingsTabAction,
            globalState: ClientState,
        },
): ClientStateMenu => {
    return {
        ...localState,
        cityView: {
            ...localState.cityView,
            building: action.payload.buildingType,
        },
    };
};
