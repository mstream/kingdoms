// @flow

import {
    DUMMY, SIGN_OUT,
} from './types';
import {
    errorsActions,
} from '../_children/errors/actions';
import {
    playerActions,
} from '../_children/player/actions';
import {
    worldsActions,
} from '../_children/worlds/actions';
import type {
    ClientActionCreator,
} from '../../types';
import type {
    ClientDummyAction, ClientSignOutAction,
} from './types';

const dummy: ClientActionCreator< ClientDummyAction > = (
    payload,
) => {

    return {
        payload,
        type: DUMMY,
    };

};

const signOut: ClientActionCreator< ClientSignOutAction > = (
    payload,
) => {

    return {
        payload,
        type: SIGN_OUT,
    };

};

const globalActions = {
    dummy,
    signOut,
};

export const clientActions = {
    errors: errorsActions,
    global: globalActions,
    player: playerActions,
    worlds: worldsActions,
};
