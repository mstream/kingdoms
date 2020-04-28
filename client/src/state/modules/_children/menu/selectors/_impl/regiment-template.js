// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';
import type {
    CommonStateRegimentTemplate,
} from '../../../../../../../../common/src/state/modules/_children/orders/reducer/types';

type Selector = ClientStateSelector< CommonStateRegimentTemplate, void >;

export const regimentTemplateSelector: Selector = (
    state,
) => {

    return state.menu.attackView.regimentTemplate;

};
