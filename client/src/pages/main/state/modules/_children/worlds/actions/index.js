// @flow


import {
    FAIL_WORLDS_UPDATE,
    REQUEST_WORLDS_UPDATE,
    SUCCEED_WORLDS_UPDATE,
} from './types';
import type {
    ClientActionCreator,
} from '../../../../types';
import type {
    ClientFailWorldsUpdateAction,
    ClientRequestWorldsUpdateAction,
    ClientSucceedWorldsUpdateAction,
} from './types';

const failWorldsUpdate: ClientActionCreator< ClientFailWorldsUpdateAction > = (
    payload,
) => {

    return {
        payload,
        type: FAIL_WORLDS_UPDATE,
    };

};

const requestWorldsUpdate: ClientActionCreator< ClientRequestWorldsUpdateAction > = (
    payload,
) => {

    return {
        payload,
        type: REQUEST_WORLDS_UPDATE,
    };

};

const succeedWorldsUpdate: ClientActionCreator< ClientSucceedWorldsUpdateAction > = (
    payload,
) => {

    return {
        payload,
        type: SUCCEED_WORLDS_UPDATE,
    };

};

export const worldsActions = {
    failWorldsUpdate,
    requestWorldsUpdate,
    succeedWorldsUpdate,
};
