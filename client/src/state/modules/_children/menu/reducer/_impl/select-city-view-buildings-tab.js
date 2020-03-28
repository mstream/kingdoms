// @flow

import type { ClientStateMenu } from '../types';
import type { ClientSelectCityViewBuildingsTabAction } from '../../actions/types';
import type { ClientStateActionReducer } from '../../../../../types';

type Reducer = ClientStateActionReducer<ClientStateMenu, ClientSelectCityViewBuildingsTabAction>;


export const selectCityViewBuildingsTabMenuReducer: Reducer = (
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
            building: action.payload.buildingType,
        },
    };
};
