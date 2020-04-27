// @flow

import {
    OPEN_CITY_VIEW,
} from './types';

import type {
    ClientActionCreator,
} from '../../../../../../types';
import type {
    ClientOpenCityViewAction,
} from './types';


type ActionCreator = ClientActionCreator< ClientOpenCityViewAction >;

export const openCityView: ActionCreator = (
    payload,
) => {

    return {
        payload,
        type: OPEN_CITY_VIEW,
    };

};
