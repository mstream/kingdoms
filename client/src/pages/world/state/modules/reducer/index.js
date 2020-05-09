// @flow

import {
    cameraReducer,
} from '../_children/camera/reducer';
import {
    commonStateReducer,
} from '../_children/common-state/reducer';
import {
    errorsReducer,
} from '../_children/errors/reducer';
import {
    menuReducer,
} from '../_children/menu/reducer';
import {
    playerReducer,
} from '../_children/player/reducer';
import {
    tilesReducer,
} from '../_children/tiles/reducer';
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
    },
);
