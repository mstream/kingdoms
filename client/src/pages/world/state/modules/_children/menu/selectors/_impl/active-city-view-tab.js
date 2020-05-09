// @flow

import type {
    ClientStateCityViewTab,
} from '../../reducer/types';
import type {
    ClientStateSelector,
} from '../../../../../types';

type Selector = ClientStateSelector< ClientStateCityViewTab, void >;

export const activeCityViewTabSelector: Selector = (
    state,
) => {

    return state.menu.cityView.tab;

};
