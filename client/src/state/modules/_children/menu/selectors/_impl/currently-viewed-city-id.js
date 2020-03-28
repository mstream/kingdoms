// @flow


import { createSelector } from 'reselect';
import type { ClientStateMenu } from '../../reducer/types';
import type { ClientState, ClientStateSelector } from '../../../../../types';


export const currentlyViewedCityIdSelector: ClientStateSelector<?string> = (state) => {
    return state.menu.cityView.currentCityId;
};