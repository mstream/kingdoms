// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';
import type {
    CommonStateUnitKey,
} from '../../../../../../../../common/src/state/modules/_children/rules/types';

type Selector = ClientStateSelector< CommonStateUnitKey, void >;

export const activeCityViewUnitSelector: Selector = (
    state,
) => {

    return state.menu.cityView.unit;

};
