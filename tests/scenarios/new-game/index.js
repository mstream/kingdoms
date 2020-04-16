// @flow

import {
    emptyCommonState,
} from '../../../common/src/state/modules/state';
import {
    generateId, generatePassword,
} from '../../../common/src/utils';
import {
    scenarios as reSignInScenarios,
} from './re-sign-in';
import {
    scenarios as signInScenarios,
} from './sign-in';
import {
    tools,
} from '../../tools';
import type {
    CommonState,
} from '../../../common/src/state/modules/types';

const name = `new game`;

const contextCreator = async () => {

    const password = generatePassword();
    const username = generateId();
    const worldId = generateId();

    const state: CommonState = {
        ...emptyCommonState,
    };

    await tools.createUsers(
        {
            users: [
                {
                    password,
                    username,
                },
            ],
        },
    );

    await tools.createWorld(
        {
            id: worldId,
            state,
        },
    );

    return {
        password,
        username,
        worldId,
    };

};


export const fixture = {
    contextCreator,
    name,
    scenarios: [
        ...reSignInScenarios,
        ...signInScenarios,
    ],
};
