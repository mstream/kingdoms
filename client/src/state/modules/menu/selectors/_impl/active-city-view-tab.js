// @flow


import type { ClientStateSelector } from '../../../types';
import type { ClientStateCityViewTab } from '../../reducer/types';


export const activeCityViewTabSelector: ClientStateSelector<ClientStateCityViewTab> = (state) => {
    return state.menu.cityView.tab;
};