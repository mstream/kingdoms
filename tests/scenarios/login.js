// @flow

import type {
    TestController,
} from 'testcafe';
import {
    Selector,
} from 'testcafe';
import {
    getLocation,
} from '../utils';
import {
    appModel,
} from '../models/app';
import {
    authModel,
} from '../models/auth';
import {
    createToken,
} from '../jwt';
import {
    TOKEN_INVALID_PRIVATE_KEY,
    TOKEN_UNPARSABLE,
    TOKEN_WITHOUT_USERNAME,
} from '../jwt/types';
import {
    generateId, generatePassword,
} from '../../common/src/utils';
import {
    tools,
} from '../tools';
import type {
    CommonState,
} from '../../common/src/state/modules/types';
import {
    emptyCommonState,
} from '../../common/src/state/modules/state';


fixture(
    `login`,
);

test(
    `redirects to login page when opened without a token`,
    async ( t: TestController, ) => {

        const worldId = generateId();

        await appModel.actions.open(
            {
                t,
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

test(
    `stays at the login page and prints an error after a failed login`,
    async ( t: TestController, ) => {

        const password = generatePassword();
        const username = `non-existent`;
        const worldId = generateId();

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

        await authModel.expectations.isAtAuthPage(
            {
                t,
            },
        );

        await t
            .expect(
                Selector(
                    `*`,
                )
                    .withExactText(
                        `The username or password you entered is invalid`,
                    ).exists,
            )
            .ok();

    },
);

test(
    `redirects back to game after a successful login`,
    async ( t: TestController, ) => {

        const password = generatePassword();
        const username = generateId();
        const worldId = generateId();

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

        await appModel.expectations.isAtAppPage(
            {
                t,
            },
        );

        await t.expect(
            getLocation(),
        )
            .contains(
                `token=`,
            );

        await t.expect(
            Selector(
                `*`,
            )
                .withExactText(
                    username,
                ).exists,
        )
            .ok();

    },
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
