// @flow


import type {
    BaseAction,
} from '../../../../../../../../../../../common/src/types/actions';

export const REQUEST_CITY_CREATION: 'REQUEST_CITY_CREATION'
    = `REQUEST_CITY_CREATION`;

export type ClientRequestCityCreationAction =
    BaseAction< typeof REQUEST_CITY_CREATION,
        $ReadOnly< {| name: string |} >, >;
