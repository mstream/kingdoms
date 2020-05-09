// @flow

import {
    CLOSE_CITY_VIEW,
} from './types';
import type {
    ClientActionCreator,
} from '../../../../../../types';
import type {
    ClientCloseCityViewAction,
} from './types';

type ActionCreator = ClientActionCreator< ClientCloseCityViewAction >;

export const closeCityView: ActionCreator = () => {

    return {
        payload: undefined,
        type   : CLOSE_CITY_VIEW,
    };

};
