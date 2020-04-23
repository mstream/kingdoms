// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';
import type {
    CommonStateRegimentTemplate,
} from '../../../../../../../../common/src/state/modules/_children/orders/reducer/types';

export const regimentTemplateSelector: ClientStateSelector< CommonStateRegimentTemplate, void > = (
    state,
) => {

    return state.menu.attackView.regimentTemplate;

};
