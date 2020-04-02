// @flow


import { getLocation } from '../../utils';
import { config } from '../../config';
import { TestController } from "testcafe";

const gotRedirectedFromAppToSignIn = async ({t}: {t: TestController}) => {
    await t.expect(getLocation()).contains(`${config.cognitoUrl}/login`);
    await t.expect(getLocation()).contains(`client_id=${config.clientId}`);
    await t.expect(getLocation()).contains(`response_type=token`);
    await t.expect(getLocation()).contains(`redirect_uri=${config.appUrl}`);
};


export const expectations = {
    gotRedirectedFromAppToSignIn,
};