// @flow


import type { ClientStateCityViewTab } from '../../reducer/types';
import type { ClientStateSelector } from '../../../../../types';


export const activeCityViewTabSelector: ClientStateSelector<ClientStateCityViewTab> = (state) => {
    return state.menu.cityView.tab;
};