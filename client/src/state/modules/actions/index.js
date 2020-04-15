// @flow

import {
    DUMMY, SIGN_OUT,
} from './types';
import {
    cameraActions,
} from '../_children/camera/actions';
import {
    commonStateActions,
} from '../_children/common-state/actions';
import {
    errorsActions,
} from '../_children/errors/actions';
import {
    menuActions,
} from '../_children/menu/actions';
import {
    playerActions,
} from '../_children/player/actions';
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
    camera     : cameraActions,
    commonState: commonStateActions,
    errors     : errorsActions,
    global     : globalActions,
    menu       : menuActions,
    player     : playerActions,
};
