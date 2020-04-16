// @flow


import {
    TOKEN_UNPARSABLE,
} from '../../../../jwt/types';
import {
    appModel,
} from '../../../../models/app';
import {
    authModel,
} from '../../../../models/auth';
import {
    combineScenarios,
} from '../../../utils';
import {
    createToken,
} from '../../../../jwt';

const name = `with unparseable token`;
const tags = [
    `authentication`,
];

const execution = async ( {
    context, t,
}, ) => {

    const {
        worldId,
    } = context;

    await appModel.actions.open(
        {
            t,
            token: createToken(
                {
                    type: TOKEN_UNPARSABLE,
                },
            ),
            worldId,
        },
    );

    await authModel.expectations.gotRedirectedFromAppToAuth(
        {
            action: `login`,
            t,
        },
    );


};


export const scenarios = combineScenarios(
    {
        children: [],
        parent  : {
            execution,
            name,
            tags,
        },
    },
);
