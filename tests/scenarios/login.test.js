// @flow

import type { TestController } from 'testcafe';
import { Selector } from 'testcafe';
import { getLocation } from '../utils';
import { config } from '../config';
import { appModel } from '../models/app';
import { authModel } from '../models/auth';


fixture(`login`);


test(`redirects to login page when opened without a token`, async (t: TestController) => {
    await appModel.actions.open({ t });
    await t.expect(getLocation()).contains(`${config.cognitoUrl}/login`);
    await t.expect(getLocation()).contains(`client_id=${config.clientId}`);
    await t.expect(getLocation()).contains(`response_type=token`);
    await t.expect(getLocation()).contains(`redirect_uri=${config.appUrl}`);
});


test(`redirects to login page when opened with an invalid token`, async (t: TestController) => {
    await appModel.actions.open({ t, token: 'INVALID_TOKEN' });
    await t.expect(getLocation()).contains(`${config.cognitoUrl}/login`);
    await t.expect(getLocation()).contains(`client_id=${config.clientId}`);
    await t.expect(getLocation()).contains(`response_type=token`);
    await t.expect(getLocation()).contains(`redirect_uri=${config.appUrl}`);
});


test(`stays at the login page and prints an error after a failed login`, async (t: TestController) => {
    await appModel.actions.open({ t });
    await authModel.actions.signIn({
        password: `$INVALID-${config.credentials.password}`,
        t,
        username: config.credentials.username,
    });
    await t.expect(getLocation()).contains(config.cognitoUrl);
    await t.expect(Selector('*').withExactText('The username or password you entered is invalid').exists).ok();
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
    await t.expect(Selector('*').withExactText(config.credentials.username).exists).ok();
});


test(`redirects to login page after a logout`, async (t: TestController) => {
    await appModel.actions.open({ t });
    await authModel.actions.signIn({
        password: config.credentials.password,
        t,
        username: config.credentials.username,
    });
    await appModel.actions.signOut({ t });
    await t.expect(getLocation()).contains(config.cognitoUrl);
});
