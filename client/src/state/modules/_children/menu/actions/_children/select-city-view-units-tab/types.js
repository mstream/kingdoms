// @flow

import type {
    BaseAction,
} from '../../../../../../../../../common/src/types/actions';
import type {
    CommonStateUnitKey,
} from '../../../../../../../../../common/src/state/modules/_children/rules/reducer/types';

export const SELECT_CITY_VIEW_UNITS_TAB: 'SELECT_CITY_VIEW_UNITS_TAB'
    = `SELECT_CITY_VIEW_UNITS_TAB`;


export type ClientSelectCityViewUnitsTabAction =
    BaseAction< typeof SELECT_CITY_VIEW_UNITS_TAB,
        $ReadOnly< {| unitType: CommonStateUnitKey |} >, >;
