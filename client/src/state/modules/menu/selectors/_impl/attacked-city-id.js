// @flow


import type { ClientStateSelector } from '../../../types';


export const attackedCityIdSelector: ClientStateSelector<?string> = (state) => {
    return state.menu.attackView.attackedCityId;
};