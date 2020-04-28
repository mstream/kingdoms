// @flow


import {
    upgradeBuilding,
} from '../../../../../../../../../common/src/state/modules/_children/cities/actions';
import type {
    ActionTransformer,
} from '../../types';
import type {
    ClientRequestBuildingUpgradeAction,
} from '../../../../../../modules/_children/common-state/actions/types';
import type {
    CommonUpgradeBuildingAction,
} from '../../../../../../../../../common/src/state/modules/_children/cities/types';

type Transformer = ActionTransformer< ClientRequestBuildingUpgradeAction,
    CommonUpgradeBuildingAction, >

export const transformer: Transformer = (
    {
        clientAction,
        username,
    },
) => {

    return upgradeBuilding(
        {
            ...clientAction.payload,
            playerId: username,
        },
    );

};
