// @flow


import type { ClientActionCreator } from '../types';
import type { ClientDummyAction } from './types';
import { DUMMY } from './types';


export const dummy: ClientActionCreator<ClientDummyAction> = (payload) => {
    return {
        type: DUMMY,
        payload,
    };
};

