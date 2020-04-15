// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';
import type {
    CommonStateResourceKey,
} from '../../../../../../../../common/src/state/modules/rules/reducer/types';

export const activeCityViewResourceSelector: ClientStateSelector< CommonStateResourceKey > = (
    state,
) => {

    return state.menu.cityView.resource;

};
