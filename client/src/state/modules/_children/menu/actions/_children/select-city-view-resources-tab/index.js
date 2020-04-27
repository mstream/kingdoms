// @flow

import {
    SELECT_CITY_VIEW_RESOURCES_TAB,
} from './types';
import type {
    ClientActionCreator,
} from '../../../../../../types';
import type {
    ClientSelectCityViewResourcesTabAction,
} from './types';

type ActionCreator = ClientActionCreator< ClientSelectCityViewResourcesTabAction >;

export const selectCityViewResourcesTab: ActionCreator = (
    payload,
) => {

    return {
        payload,
        type: SELECT_CITY_VIEW_RESOURCES_TAB,
    };

};
