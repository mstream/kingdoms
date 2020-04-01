// @flow

import { config } from '../config';
import { Selector, TestController } from 'testcafe';

const selectors = {
    userMenuButton: Selector('*[data-testid="user-menu-button"]'),
    signOutButton: Selector('*[data-testid="user-menu-sign-out-button"]'),
};


const open = async (
    {
        t,
        token,
    }: {
        t: TestController,
        token?: string
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
    await t.hover(selectors.userMenuButton).click(selectors.signOutButton);
};

const actions = {
    open,
    signOut,
};

export const appModel = {
    actions,
};