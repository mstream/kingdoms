// @flow

import {
    REQUEST_CITY_CREATION,
} from './types';
import type {
    ClientActionCreator,
} from '../../../../../../types';
import type {
    ClientRequestCityCreationAction,
} from './types';

type ActionCreator = ClientActionCreator< ClientRequestCityCreationAction >;

export const requestCityCreation: ActionCreator = (
    payload,
) => {

    return {
        payload,
        type: REQUEST_CITY_CREATION,
    };

};
