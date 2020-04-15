// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';
import type {
    CommonStateRegimentTemplate,
} from '../../../../../../../../common/src/state/modules/orders/reducer/types';

export const regimentTemplateSelector: ClientStateSelector< CommonStateRegimentTemplate > = (
    state,
) => {

    return state.menu.attackView.regimentTemplate;

};
