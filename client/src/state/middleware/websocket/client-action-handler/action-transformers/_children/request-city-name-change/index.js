// @flow


import {
    changeCityName,
} from '../../../../../../../../../common/src/state/modules/_children/cities/actions';
import type {
    ActionTransformer,
} from '../../types';
import type {

    ClientRequestCityNameChangeAction,
} from '../../../../../../modules/_children/common-state/actions/types';
import type {
    CommonChangeCityNameAction,
} from '../../../../../../../../../common/src/state/modules/_children/cities/types';

type Transformer = ActionTransformer< ClientRequestCityNameChangeAction,
    CommonChangeCityNameAction, >

export const transformer: Transformer = (
    {
        clientAction,
        username,
    },
) => {

    return changeCityName(
        {
            ...clientAction.payload,
            playerId: username,
        },
    );

};
