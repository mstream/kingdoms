// @flow

import type { TestController } from 'testcafe';
import { getLocation } from '../utils';
import { config } from '../config';

fixture(`login`);

test(`test1`, async (t: TestController) => {
    await t.navigateTo(config.appUrl);
    const location = await getLocation();
    await t.expect(location).contains(`${config.cognitoUrl}/login`);
    await t.expect(location).contains(`client_id=${config.clientId}`);
    await t.expect(location).contains(`response_type=token`);
    await t.expect(location).contains(`redirect_uri=${config.appUrl}`);
});