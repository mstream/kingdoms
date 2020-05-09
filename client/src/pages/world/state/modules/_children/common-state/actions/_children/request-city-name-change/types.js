// @flow

import type {
    BaseAction,
} from '../../../../../../../../../../../common/src/types/actions';

export const REQUEST_CITY_NAME_CHANGE: 'REQUEST_CITY_NAME_CHANGE'
    = `REQUEST_CITY_NAME_CHANGE`;

export type ClientRequestCityNameChangeAction =
    BaseAction< typeof REQUEST_CITY_NAME_CHANGE,
        $ReadOnly< {|
            cityId: string,
            name: string
        |} >, >;
