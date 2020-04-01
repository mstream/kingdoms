// @flow

import { config } from '../config';
import { Selector, TestController } from 'testcafe';

const selectors = {
    userMenuButton: Selector('*[data-testid="user-menu-button"]'),
    signOutButton: Selector('*[data-testid="user-menu-sign-out-button"]'),
};


const openWithToken = async (
    {
        t,
        token,
    }: {
        t: TestController,
        token: ?string
    },
): Promise<void> => {
    const url = token == null ?
        config.appUrl :
        `${config.appUrl}/#id_token=${token}`;

    await t.navigateTo(url);
};

const signOut = async (
    {
        t,
    }: {
        t: TestController,
    },
): Promise<void> => {
    await t.setTestSpeed(0.01).hover(selectors.userMenuButton).hover(selectors.signOutButton).click(selectors.signOutButton);
};

const actions = {
    openWithToken,
    signOut,
};

export const appModel = {
    actions,
};