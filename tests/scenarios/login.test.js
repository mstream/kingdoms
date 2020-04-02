// @flow

import type { TestController } from 'testcafe';
import { Selector } from 'testcafe';
import { getLocation } from '../utils';
import { config } from '../config';
import { appModel } from '../models/app';
import { authModel } from '../models/auth';
import { createToken } from '../jwt';
import {
    TOKEN_INVALID_PRIVATE_KEY,
    TOKEN_UNPARSABLE,
    TOKEN_WITHOUT_USERNAME,
} from '../jwt/types';

fixture(`login`);

test(`redirects to login page when opened without a token`, async (t: TestController) => {
    await appModel.actions.open({ t });

    await authModel.expectations.gotRedirectedFromAppToSignIn({ t });
});

test(`redirects to login page when opened with an unparsable token`, async (t: TestController) => {
    await appModel.actions.open({
        t,
        token: createToken({ type: TOKEN_UNPARSABLE }),
    });

    await authModel.expectations.gotRedirectedFromAppToSignIn({ t });
});

test(`redirects to login page when opened with a token not containing the username`, async (t: TestController) => {
    await appModel.actions.open({
        t,
        token: createToken({ type: TOKEN_WITHOUT_USERNAME }),
    });

    await authModel.expectations.gotRedirectedFromAppToSignIn({ t });
});

test(`redirects to login page when opened with a token signed with an invalid private key`, async (t: TestController) => {
    await appModel.actions.open({
        t,
        token: createToken({ type: TOKEN_INVALID_PRIVATE_KEY }),
    });

    await authModel.expectations.gotRedirectedFromAppToSignIn({ t });
});

test(`stays at the login page and prints an error after a failed login`, async (t: TestController) => {
    await appModel.actions.open({ t });
    await authModel.actions.signIn({
        password: `$INVALID-${config.credentials.password}`,
        t,
        username: config.credentials.username,
    });

    await t.expect(getLocation()).contains(config.cognitoUrl);
    await t
        .expect(
            Selector('*').withExactText(
                'The username or password you entered is invalid',
            ).exists,
        )
        .ok();
});

test(`redirects back to game after a successful login`, async (t: TestController) => {
    await appModel.actions.open({ t });
    await authModel.actions.signIn({
        password: config.credentials.password,
        t,
        username: config.credentials.username,
    });

    await t.expect(getLocation()).contains(config.appUrl);
    await t.expect(getLocation()).contains(`token=`);
    await t
        .expect(Selector('*').withExactText(config.credentials.username).exists)
        .ok();
});

test(`redirects to login page after a logout`, async (t: TestController) => {
    await appModel.actions.open({ t });
    await authModel.actions.signIn({
        password: config.credentials.password,
        t,
        username: config.credentials.username,
    });
    await appModel.actions.signOut({ t });

    await authModel.expectations.gotRedirectedFromAppToSignIn({ t });
});
