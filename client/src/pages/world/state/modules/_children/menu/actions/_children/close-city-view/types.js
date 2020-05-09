// @flow


import type {
    BaseAction,
} from '../../../../../../../../../../../common/src/types/actions';

export const CLOSE_CITY_VIEW: 'CLOSE_CITY_VIEW'
    = `CLOSE_CITY_VIEW`;


export type ClientCloseCityViewAction =
    BaseAction< typeof CLOSE_CITY_VIEW,
        void, >;
