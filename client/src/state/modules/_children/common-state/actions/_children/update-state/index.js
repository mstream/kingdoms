// @flow

import {
    UPDATE_STATE,
} from './types';

import type {
    ClientActionCreator,
} from '../../../../../../types';
import type {
    ClientUpdateStateAction,
} from './types';

type ActionCreator = ClientActionCreator< ClientUpdateStateAction >;

export const updateState: ActionCreator = (
    payload,
) => {

    return {
        payload,
        type: UPDATE_STATE,
    };

};
