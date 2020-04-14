// @flow

import type {
    CommonStateBuildingKey,
} from '../../../../../../../../common/src/state/modules/rules/reducer/types';
import type {
    ClientStateSelector,
} from '../../../../../types';

export const activeCityViewBuildingSelector: ClientStateSelector< CommonStateBuildingKey > = (
    state,
) => {

    return state.menu.cityView.building;

};
