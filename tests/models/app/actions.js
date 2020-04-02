// @flow

import { TestController } from 'testcafe';
import { selectors } from './selectors';
import { config } from '../../config';

const open = async ({
    t,
    token,
}: {
    t: TestController,
    token?: string,
}): Promise<void> => {
    const url =
        token == null ? config.appUrl : `${config.appUrl}/#id_token=${token}`;

    console.info(`navigating to the app page using url: ${url}`);

    await t.navigateTo(url);
};

const signOut = async ({ t }: { t: TestController }): Promise<void> => {
    await t.hover(selectors.userMenuButton).click(selectors.signOutButton);
};

export const actions = {
    open,
    signOut,
};
