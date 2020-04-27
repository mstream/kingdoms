// @flow

import type {
    BaseAction,
} from '../../../../../../../../../common/src/types/actions';
import type {
    CommonStateResourceKey,
} from '../../../../../../../../../common/src/state/modules/_children/rules/reducer/types';

export const SELECT_CITY_VIEW_RESOURCES_TAB: 'SELECT_CITY_VIEW_RESOURCES_TAB'
    = `SELECT_CITY_VIEW_RESOURCES_TAB`;


export type ClientSelectCityViewResourcesTabAction =
    BaseAction< typeof SELECT_CITY_VIEW_RESOURCES_TAB,
        $ReadOnly< {| resourceType: CommonStateResourceKey |} >, >;
