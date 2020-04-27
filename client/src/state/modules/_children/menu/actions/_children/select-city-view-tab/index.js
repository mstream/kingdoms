// @flow

import {
    SELECT_CITY_VIEW_TAB,
} from './types';
import type {
    ClientActionCreator,
} from '../../../../../../types';
import type {
    ClientSelectCityViewTabAction,
} from './types';

type ActionCreator = ClientActionCreator< ClientSelectCityViewTabAction >;

export const selectCityViewTab: ActionCreator = (
    payload,
) => {

    return {
        payload,
        type: SELECT_CITY_VIEW_TAB,
    };

};
