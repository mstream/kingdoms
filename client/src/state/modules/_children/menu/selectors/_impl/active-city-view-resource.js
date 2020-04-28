// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';
import type {
    CommonStateResourceKey,
} from '../../../../../../../../common/src/state/modules/_children/rules/reducer/types';

type Selector = ClientStateSelector< CommonStateResourceKey, void >;

export const activeCityViewResourceSelector: Selector = (
    state,
) => {

    return state.menu.cityView.resource;

};
