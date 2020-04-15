// @flow

import {
    REQUEST_BUILDING_UPGRADE,
    REQUEST_CITY_CREATION,
    REQUEST_CITY_NAME_CHANGE,
    REQUEST_ORDER_CREATION,
} from '../../../../modules/_children/common-state/actions/types';
import {
    changeCityName,
    createCity,
    upgradeBuilding,
} from '../../../../../../../common/src/state/modules/cities/actions';
import {
    createScheduledAttackOrder,
} from '../../../../../../../common/src/state/modules/orders/actions';
import {
    generateId,
} from '../../../../../../../common/src/utils';
import type {
    ClientAction, ClientActionKey,
} from '../../../../types';
import type {
    ClientRequestBuildingUpgradeAction,
    ClientRequestCityCreationAction,
    ClientRequestCityNameChangeAction,
    ClientRequestOrderCreationAction,
} from '../../../../modules/_children/common-state/actions/types';
import type {
    CommonChangeCityNameAction,
    CommonCreateCityAction,
    CommonUpgradeBuildingAction,
} from '../../../../../../../common/src/state/modules/cities/actions/types';
import type {
    CommonCreateScheduledAttackOrderAction,
} from '../../../../../../../common/src/state/modules/orders/actions/types';
import type {
    CommonPlayerAction,
} from '../../../../../../../common/src/state/types';

type ActionTransformer<+A: ClientAction, +B: CommonPlayerAction> = (
    $ReadOnly< { clientAction: A, username: string } >,
) => B;

const transformRequestBuildingUpgrade: ActionTransformer< ClientRequestBuildingUpgradeAction,
    CommonUpgradeBuildingAction, > = (
        {
            clientAction, username,
        },
    ) => {

        return upgradeBuilding(
            {
                ...clientAction.payload,
                playerId: username,
            },
        );

    };

const transformRequestCityNameChange: ActionTransformer< ClientRequestCityNameChangeAction,
    CommonChangeCityNameAction, > = (
        {
            clientAction, username,
        },
    ) => {

        return changeCityName(
            {
                ...clientAction.payload,
                playerId: username,
            },
        );

    };

const transformRequestCityCreation: ActionTransformer< ClientRequestCityCreationAction,
    CommonCreateCityAction, > = (
        {
            clientAction, username,
        },
    ) => {

        return createCity(
            {
                ...clientAction.payload,
                cityId  : generateId(),
                playerId: username,
            },
        );

    };

const transformRequestOrderCreation: ActionTransformer< ClientRequestOrderCreationAction,
    CommonCreateScheduledAttackOrderAction, > = (
        {
            clientAction, username,
        },
    ) => {

        return createScheduledAttackOrder(
            {
                ...clientAction.payload,
                orderId : generateId(),
                playerId: username,
            },
        );

    };

export const actionTransformers: {
    [ClientActionKey]: ActionTransformer< ClientAction, CommonPlayerAction >,
} = {
    [ REQUEST_BUILDING_UPGRADE ]: transformRequestBuildingUpgrade,
    [ REQUEST_CITY_CREATION ]   : transformRequestCityCreation,
    [ REQUEST_CITY_NAME_CHANGE ]: transformRequestCityNameChange,
    [ REQUEST_ORDER_CREATION ]  : transformRequestOrderCreation,
};
