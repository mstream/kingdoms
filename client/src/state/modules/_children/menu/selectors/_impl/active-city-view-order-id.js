// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';

export const activeCityViewOrderIdSelector: ClientStateSelector< ?string, void > = (
    state,
) => {

    return state.menu.cityView.orderId;

};
