// @flow

import {
    TOKEN_INVALID_PRIVATE_KEY,
    TOKEN_UNPARSABLE,
    TOKEN_WITHOUT_USERNAME,
} from '../../../jwt/types';
import {
    appModel,
} from '../../../models/app';
import {
    authModel,
} from '../../../models/auth';
import {
    createToken,
} from '../../../jwt';
import {
    generateId,
} from '../../../../common/src/utils';
import type {
    TestController,
} from 'testcafe';


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
