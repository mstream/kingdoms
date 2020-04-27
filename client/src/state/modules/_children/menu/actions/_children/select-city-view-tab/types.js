// @flow


import type {
    BaseAction,
} from '../../../../../../../../../common/src/types/actions';
import type {
    ClientStateCityViewTab,
} from '../../../reducer/types';

export const SELECT_CITY_VIEW_TAB: 'SELECT_CITY_VIEW_TAB'
    = `SELECT_CITY_VIEW_TAB`;

export type ClientSelectCityViewTabAction =
    BaseAction< typeof SELECT_CITY_VIEW_TAB,
        $ReadOnly< {| tab: ClientStateCityViewTab |} >, >;
