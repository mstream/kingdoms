// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';
import type {
    CommonStateBuildingKey,
} from '../../../../../../../../../../common/src/state/modules/_children/rules/types';

type Selector = ClientStateSelector< CommonStateBuildingKey, void >;

export const activeCityViewBuildingSelector: Selector = (
    state,
) => {

    return state.menu.cityView.building;

};
