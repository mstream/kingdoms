// @flow

import type {
    BaseAction,
} from '../../../../../../../../../common/src/types/actions';
import type {
    CommonStateBuildingKey,
} from '../../../../../../../../../common/src/state/modules/_children/rules/types';

export const SELECT_CITY_VIEW_BUILDINGS_TAB: 'SELECT_CITY_VIEW_BUILDINGS_TAB'
    = `SELECT_CITY_VIEW_BUILDINGS_TAB`;


export type ClientSelectCityViewBuildingsTabAction =
    BaseAction< typeof SELECT_CITY_VIEW_BUILDINGS_TAB,
        $ReadOnly< {| buildingType: CommonStateBuildingKey |} >, >;
