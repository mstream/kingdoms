// @flow


import {
    REQUEST_ORDER_CREATION,
} from './types';
import type {
    ClientActionCreator,
} from '../../../../../../types';
import type {
    ClientRequestOrderCreationAction,
} from './types';

type ActionCreator = ClientActionCreator< ClientRequestOrderCreationAction >;

export const requestOrderCreation: ActionCreator = (
    payload,
) => {

    return {
        payload,
        type: REQUEST_ORDER_CREATION,
    };

};
