// @flow

import type { TestController } from 'testcafe';
import { fixture, Selector } from 'testcafe';
import { getLocation } from '../utils';
import { config } from '../config';
import { appModel } from '../models/app';
import { authModel } from '../models/auth';

fixture(`login`);

test(`redirection to login page`, async (t: TestController) => {
    await appModel.actions.openWithToken({ t, token: null });
    await t.expect(getLocation()).contains(`${config.cognitoUrl}/login`);
    await t.expect(getLocation()).contains(`client_id=${config.clientId}`);
    await t.expect(getLocation()).contains(`response_type=token`);
    await t.expect(getLocation()).contains(`redirect_uri=${config.appUrl}`);
});

test(`redirection from login page after successful login`, async (t: TestController) => {
    await appModel.actions.openWithToken({ t, token: null });
    await authModel.actions.signIn({
        password: config.credentials.password,
        t,
        username: config.credentials.username,
    });
    await t.expect(getLocation()).contains(config.appUrl);
    await t.expect(getLocation()).contains(`token=`);
    await t.expect(Selector('body')).contains(config.credentials.username);
});

test(`redirection to login page after logout`, async (t: TestController) => {
    await appModel.actions.openWithToken({ t, token: null });
    await authModel.actions.signIn({
        password: config.credentials.password,
        t,
        username: config.credentials.username,
    });
    await appModel.actions.signOut({ t });
    await t.expect(getLocation()).contains(config.cognitoUrl);
});
