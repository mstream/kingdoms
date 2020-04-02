// @flow

import type { CommonStateRegimentTemplate } from '../../../../../../../../common/src/state/modules/orders/reducer/types';
import type { ClientStateSelector } from '../../../../../types';

export const regimentTemplateSelector: ClientStateSelector<CommonStateRegimentTemplate> = (
    state,
) => {
    return state.menu.attackView.regimentTemplate;
};
