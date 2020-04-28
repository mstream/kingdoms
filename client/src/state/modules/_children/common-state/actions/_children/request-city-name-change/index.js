// @flow

import {
    REQUEST_CITY_NAME_CHANGE,
} from './types';
import type {
    ClientActionCreator,
} from '../../../../../../types';
import type {
    ClientRequestCityNameChangeAction,
} from './types';

type ActionCreator = ClientActionCreator< ClientRequestCityNameChangeAction >;

export const requestCityNameChange: ActionCreator = (
    payload,
) => {

    return {
        payload,
        type: REQUEST_CITY_NAME_CHANGE,
    };

};
