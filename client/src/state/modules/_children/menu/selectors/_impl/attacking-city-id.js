// @flow


import type { ClientStateSelector } from '../../../../../types';


export const attackingCityIdSelector: ClientStateSelector<?string> = (state) => {
    return state.menu.attackView.attackingCityId;
};