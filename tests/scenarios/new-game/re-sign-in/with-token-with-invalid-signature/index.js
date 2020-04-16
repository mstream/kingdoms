// @flow


import {
    TOKEN_WITHOUT_USERNAME,
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

const name = `with a token with invalid signature`;
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
                    type: TOKEN_WITHOUT_USERNAME,
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
