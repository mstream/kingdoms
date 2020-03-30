// @flow


import type { ClientAction, ClientActionKey } from '../../../../types';
import type { CommonAction } from '../../../../../../../common/src/state/types';
import type {
    ClientRequestBuildingUpgradeAction,
    ClientRequestCityCreationAction,
    ClientRequestCityNameChangeAction,
    ClientRequestOrderCreationAction,
} from '../../../../modules/_children/common-state/actions/types';
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
import { generateId } from '../../../../../../../common/src/util';
import type { CommonCreateScheduledAttackOrderAction } from '../../../../../../../common/src/state/modules/orders/actions/types';
import type {
    CommonChangeCityNameAction,
    CommonCreateCityAction,
    CommonUpgradeBuildingAction,
} from '../../../../../../../common/src/state/modules/cities/actions/types';
import { createScheduledAttackOrder } from '../../../../../../../common/src/state/modules/orders/actions';

type ActionTransformer<+A: ClientAction, +B: CommonAction> =
    ($ReadOnly<{ clientAction: A, username: string }>) => CommonAction;

const transformRequestBuildingUpgrade: ActionTransformer<ClientRequestBuildingUpgradeAction, CommonUpgradeBuildingAction> = (
    {
        clientAction,
        username,
    },
) => {
    return upgradeBuilding({
        ...clientAction.payload,
        playerId: username,
    });
};

const transformRequestCityNameChange: ActionTransformer<ClientRequestCityNameChangeAction, CommonChangeCityNameAction> = (
    {
        clientAction,
        username,
    },
) => {
    return changeCityName({
        ...clientAction.payload,
        playerId: username,
    });
};

const transformRequestCityCreation: ActionTransformer<ClientRequestCityCreationAction, CommonCreateCityAction> = (
    {
        clientAction,
        username,
    },
) => {
    return createCity({
        ...clientAction.payload,
        cityId: generateId(),
        playerId: username,
    });
};

const transformRequestOrderCreation: ActionTransformer<ClientRequestOrderCreationAction, CommonCreateScheduledAttackOrderAction> = (
    {
        clientAction,
        username,
    },
) => {
    return createScheduledAttackOrder({
        ...clientAction.payload,
        orderId: generateId(),
        playerId: username,
    });
};

export const actionTransformers: { [ClientActionKey]: ActionTransformer<ClientAction, CommonAction> } = {
    [REQUEST_BUILDING_UPGRADE]: transformRequestBuildingUpgrade,
    [REQUEST_CITY_NAME_CHANGE]: transformRequestCityNameChange,
    [REQUEST_CITY_CREATION]: transformRequestCityCreation,
    [REQUEST_ORDER_CREATION]: transformRequestOrderCreation,
};
