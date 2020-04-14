// @flow

import {
    TestController,
} from 'testcafe';
import {
    selectors,
} from './selectors';

const signIn = async ( {
    password,
    t,
    username,
}: {
    password: string,
    t: TestController,
    username: string,
}, ): Promise< void > => {

    console.log(
        `signing in user '${ username }' using password '${ password }'`,
    );

    await t.typeText(
        selectors.usernameInput,
        username,
    );

    await t.typeText(
        selectors.passwordInput,
        password,
    );

    await t.click(
        selectors.signInButton,
    );

};

export const actions = {
    signIn,
};
