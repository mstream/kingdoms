// @flow

import {
    REQUEST_BUILDING_UPGRADE,
    REQUEST_CITY_CREATION,
    REQUEST_CITY_NAME_CHANGE,
    REQUEST_ORDER_CREATION,
} from '../../../../modules/_children/common-state/actions/types';
import {
    transformer as requestBuildingUpgradeTransformer,
} from './_children/request-building-upgrade';
import {
    transformer as requestCityCreationTransformer,
} from './_children/request-city-creation';
import {
    transformer as requestCityNameTransformer,
} from './_children/request-city-name-change';
import {
    transformer as requestOrderCreationTransformer,
} from './_children/request-order-creation';
import type {
    ActionTransformer,
} from './types';
import type {
    ClientAction, ClientActionKey,
} from '../../../../types';
import type {
    CommonPlayerAction,
} from '../../../../../../../common/src/state/types';

export const actionTransformers: {
    [ClientActionKey]: ActionTransformer< ClientAction, CommonPlayerAction >,
} = {
    [ REQUEST_BUILDING_UPGRADE ]: requestBuildingUpgradeTransformer,
    [ REQUEST_CITY_CREATION ]   : requestCityCreationTransformer,
    [ REQUEST_CITY_NAME_CHANGE ]: requestCityNameTransformer,
    [ REQUEST_ORDER_CREATION ]  : requestOrderCreationTransformer,
};
