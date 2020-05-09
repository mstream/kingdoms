// @flow

import {
    REQUEST_BUILDING_UPGRADE,
} from './types';
import type {
    ClientActionCreator,
} from '../../../../../../types';
import type {
    ClientRequestBuildingUpgradeAction,
} from './types';

type ActionCreator = ClientActionCreator< ClientRequestBuildingUpgradeAction >;

export const requestBuildingUpgrade: ActionCreator = (
    payload,
) => {

    return {
        payload,
        type: REQUEST_BUILDING_UPGRADE,
    };

};
