// @flow

import { Selector, TestController } from 'testcafe';


const selectors = {
    passwordInput: Selector('#signInFormPassword').nth(1),
    signInButton: Selector('input[type="submit"]').nth(1),
    usernameInput: Selector('#signInFormUsername').nth(1),
};

const signIn = async (
    {
        password,
        t,
        username,
    }: {
        password: string,
        t: TestController,
        username: string
    },
): Promise<void> => {
    await t.typeText(selectors.usernameInput, username);
    await t.typeText(selectors.passwordInput, password);
    await t.click(selectors.signInButton);
};

const actions = {
    signIn,
};

export const authModel = {
    actions,
    selectors,
};