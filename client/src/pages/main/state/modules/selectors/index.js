// @flow


import {
    clientStateErrorsSelectors,
} from '../_children/errors/selectors';
import {
    clientStatePlayerSelectors,
} from '../_children/player/selectors';
import {
    clientStateWorldsSelectors,
} from '../_children/worlds/selectors';

export const clientStateSelectors = {
    errors: clientStateErrorsSelectors,
    player: clientStatePlayerSelectors,
    worlds: clientStateWorldsSelectors,
};
