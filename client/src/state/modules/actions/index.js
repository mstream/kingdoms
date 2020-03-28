// @flow


import type { ClientActionCreator } from '../../types';
import type { ClientDummyAction } from './types';
import { DUMMY } from './types';
import { menuActions } from '../_children/menu/actions';
import { cameraActions } from '../_children/camera/actions';
import { commonStateActions } from '../_children/common-state/actions';
import { playerActions } from '../_children/player/actions';
import { errorsActions } from '../_children/errors/actions';


const dummy: ClientActionCreator<ClientDummyAction> = (payload) => {
    return {
        type: DUMMY,
        payload,
    };
};

const dummyActions = {
    dummy,
};

export const clientActions = {
    camera: cameraActions,
    commonState: commonStateActions,
    dummy: dummyActions,
    errors: errorsActions,
    menu: menuActions,
    player: playerActions,
};
