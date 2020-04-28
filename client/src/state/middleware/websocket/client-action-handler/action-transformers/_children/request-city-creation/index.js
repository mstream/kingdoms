// @flow


import {
    createCity,
} from '../../../../../../../../../common/src/state/modules/_children/cities/actions';
import {
    generateId,
} from '../../../../../../../../../common/src/utils';
import type {
    ActionTransformer,
} from '../../types';
import type {
    ClientRequestCityCreationAction,
} from '../../../../../../modules/_children/common-state/actions/types';
import type {
    CommonCreateCityAction,
} from '../../../../../../../../../common/src/state/modules/_children/cities/types';

type Transformer = ActionTransformer< ClientRequestCityCreationAction,
    CommonCreateCityAction, >

export const transformer: Transformer = (
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
