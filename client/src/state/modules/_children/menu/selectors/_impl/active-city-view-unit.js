// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';
import type {
    CommonStateUnitKey,
} from '../../../../../../../../common/src/state/modules/_children/rules/reducer/types';

export const activeCityViewUnitSelector: ClientStateSelector< CommonStateUnitKey, void > = (
    state,
) => {

    return state.menu.cityView.unit;

};
