// @flow

import type { ClientStateCityViewTab } from '../../reducer/types';
import type { CommonStateResourceKey } from '../../../../../../../../common/src/state/modules/rules/reducer/types';
import type { ClientStateSelector } from '../../../../../types';

export const activeCityViewResourceSelector: ClientStateSelector<CommonStateResourceKey> = (
    state,
) => {
    return state.menu.cityView.resource;
};
