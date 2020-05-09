// @flow

import {
    SELECT_CITY_VIEW_BUILDINGS_TAB,
} from './types';
import type {
    ClientActionCreator,
} from '../../../../../../types';
import type {
    ClientSelectCityViewBuildingsTabAction,
} from './types';

type ActionCreator = ClientActionCreator< ClientSelectCityViewBuildingsTabAction >;

export const selectCityViewBuildingsTab: ActionCreator = (
    payload,
) => {

    return {
        payload,
        type: SELECT_CITY_VIEW_BUILDINGS_TAB,
    };

};
