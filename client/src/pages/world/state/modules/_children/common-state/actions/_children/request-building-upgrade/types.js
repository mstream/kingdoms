// @flow


import type {
    BaseAction,
} from '../../../../../../../../../../../common/src/types/actions';
import type {
    CommonStateBuildingKey,
} from '../../../../../../../../../../../common/src/state/modules/_children/rules/types';

export const REQUEST_BUILDING_UPGRADE: 'REQUEST_BUILDING_UPGRADE'
    = `REQUEST_BUILDING_UPGRADE`;

export type ClientRequestBuildingUpgradeAction =
    BaseAction< typeof REQUEST_BUILDING_UPGRADE,
        $ReadOnly< {|
            cityId: string,
            buildingType: CommonStateBuildingKey
        |} >, >;
