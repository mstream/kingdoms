// @flow


import type { ClientStateSelector } from '../../../../../types';


export const activeCityViewOrderIdSelector: ClientStateSelector<?string> = (state) => {
    return state.menu.cityView.orderId;
};