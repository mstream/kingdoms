// @flow

import {
    requestBuildingUpgrade,
} from './_children/request-building-upgrade';
import {
    requestCityCreation,
} from './_children/request-city-creation';
import {
    requestCityNameChange,
} from './_children/request-city-name-change';
import {
    requestOrderCreation,
} from './_children/request-order-creation';
import {
    updateState,
} from './_children/update-state';


export const commonStateActions = {
    requestBuildingUpgrade,
    requestCityCreation,
    requestCityNameChange,
    requestOrderCreation,
    updateState,
};
