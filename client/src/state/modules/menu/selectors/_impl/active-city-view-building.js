// @flow


import type { ClientStateSelector } from '../../../types';
import type { ClientStateCityViewTab } from '../../reducer/types';
import type { CommonStateBuildingKey } from '../../../../../../../common/src/state/modules/rules/reducer/types';


export const activeCityViewBuildingSelector: ClientStateSelector<CommonStateBuildingKey> = (state) => {
    return state.menu.cityView.building;
};