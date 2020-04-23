// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';
import type {
    CommonStateResourceKey,
} from '../../../../../../../../common/src/state/modules/_children/rules/reducer/types';

export const activeCityViewResourceSelector: ClientStateSelector< CommonStateResourceKey, void > = (
    state,
) => {

    return state.menu.cityView.resource;

};
