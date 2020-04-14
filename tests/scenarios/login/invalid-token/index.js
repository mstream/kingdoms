// @flow

import type {
    TestController,
} from 'testcafe';
import {
    generateId,
} from '../../../../common/src/utils';
import {
    appModel,
} from '../../../models/app';
import {
    TOKEN_INVALID_PRIVATE_KEY,
    TOKEN_UNPARSABLE,
    TOKEN_WITHOUT_USERNAME,
} from '../../../jwt/types';
import {
    createToken,
} from '../../../jwt';
import {
    authModel,
} from '../../../models/auth';


fixture(
    `login`,
);

test(
    `redirects to login page when opened with an unparsable token`,
    async ( t: TestController, ) => {

        const worldId = generateId();

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

    },
);

test(
    `redirects to login page when opened with a token not containing the username`,
    async ( t: TestController, ) => {

        const worldId = generateId();

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

    },
);

test(
    `redirects to login page when opened with a token signed with an invalid private key`,
    async ( t: TestController, ) => {

        const worldId = generateId();

        await appModel.actions.open(
            {
                t,
                token: createToken(
                    {
                        type: TOKEN_INVALID_PRIVATE_KEY,
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

    },
);
