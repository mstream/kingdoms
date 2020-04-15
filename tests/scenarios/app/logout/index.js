// @flow

import type {
    TestController,
} from 'testcafe';

import {
    appModel,
} from '../../../models/app';
import {
    authModel,
} from '../../../models/auth';
import {
    emptyCommonState,
} from '../../../../common/src/state/modules/state';
import {
    generateId, generatePassword,
} from '../../../../common/src/utils';
import {
    tools,
} from '../../../tools';
import type {
    CommonState,
} from '../../../../common/src/state/modules/types';


fixture(
    `app`,
);

test(
    `redirects to login page after a logout`,
    async ( t: TestController, ) => {

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

        await appModel.actions.open(
            {
                t,
                worldId,
            },
        );

        await authModel.actions.signIn(
            {
                password,
                t,
                username,
            },
        );

        await appModel.actions.signOut(
            {
                t,
            },
        );

        await authModel.expectations.gotRedirectedFromAppToAuth(
            {
                action: `login`,
                t,
            },
        );

    },
);
