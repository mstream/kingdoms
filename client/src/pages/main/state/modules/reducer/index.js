// @flow

import {
    cameraReducer,
} from '../../../../world/state/modules/_children/camera/reducer';
import {
    commonStateReducer,
} from '../../../../world/state/modules/_children/common-state/reducer';
import {
    errorsReducer,
} from '../_children/errors/reducer';
import {
    menuReducer,
} from '../../../../world/state/modules/_children/menu/reducer';
import {
    playerReducer,
} from '../_children/player/reducer';
import {
    tilesReducer,
} from '../../../../world/state/modules/_children/tiles/reducer';
import {
    worldsReducer,
} from '../_children/worlds/reducer';
import combineReducers from 'combine-reducers-global-state';
import type {
    ClientAction, ClientState,
} from '../../types';
import type {
    Reducer,
} from 'redux';

export const rootReducer: Reducer< ClientState, ClientAction > = combineReducers(
    {
        camera     : cameraReducer,
        commonState: commonStateReducer,
        errors     : errorsReducer,
        menu       : menuReducer,
        player     : playerReducer,
        tiles      : tilesReducer,
        worlds     : worldsReducer,
    },
);
