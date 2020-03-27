// @flow


import type { ClientState, ClientStateSelector } from '../../../types';
import { createSelector } from 'reselect';
import type { ClientStateMenu } from '../../reducer/types';


export const currentlyViewedCityIdSelector: ClientStateSelector<?string> = (state) => {
    return state.menu.cityView.currentCityId;
};