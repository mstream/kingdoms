// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';
import type {
    CommonStateBuildingKey,
} from '../../../../../../../../common/src/state/modules/_children/rules/reducer/types';

export const activeCityViewBuildingSelector: ClientStateSelector< CommonStateBuildingKey, void > = (
    state,
) => {

    return state.menu.cityView.building;

};
