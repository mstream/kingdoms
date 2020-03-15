// @flow

import type { ClientStateMenu } from './types';
import type { ClientState } from '../../root';
import type {
    ClientSelectCityViewBuildingsTabAction,
    ClientSelectCityViewResourceTabAction,
} from '../actions';

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
