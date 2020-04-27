// @flow

import {
    SELECT_CITY_VIEW_UNITS_TAB,
} from './types';
import type {
    ClientActionCreator,
} from '../../../../../../types';
import type {
    ClientSelectCityViewUnitsTabAction,
} from './types';

type ActionCreator = ClientActionCreator< ClientSelectCityViewUnitsTabAction >;

export const selectCityViewUnitsTab: ActionCreator = (
    payload,
) => {

    return {
        payload,
        type: SELECT_CITY_VIEW_UNITS_TAB,
    };

};
