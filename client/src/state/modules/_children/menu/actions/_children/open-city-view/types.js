// @flow


import type {
    BaseAction,
} from '../../../../../../../../../common/src/types/actions';

export const OPEN_CITY_VIEW: 'OPEN_CITY_VIEW' = `OPEN_CITY_VIEW`;


export type ClientOpenCityViewAction =
    BaseAction< typeof OPEN_CITY_VIEW,
        $ReadOnly< {| cityId: string |} >, >;
