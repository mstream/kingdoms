// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';
import type {
    CommonStateUnitKey,
} from '../../../../../../../../common/src/state/modules/rules/reducer/types';

export const activeCityViewUnitSelector: ClientStateSelector< CommonStateUnitKey > = (
    state,
) => {

    return state.menu.cityView.unit;

};
