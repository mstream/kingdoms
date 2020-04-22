// @flow

import {
    TestController,
} from 'testcafe';
import {
    selectors,
} from '../selectors';
import type {
    Logger,
} from '../../../../common/src/logging/types';

const signIn = async ( {
    logger,
    password,
    t,
    username,
}: {
    logger: Logger,
    password: string,
    t: TestController,
    username: string,
}, ): Promise< void > => {

    logger.info(
        `signing in user '${ username }' using password '${ password }'`,
    );

    await t.typeText(
        selectors
            .auth
            .usernameInput,
        username,
    );

    await t.typeText(
        selectors
            .auth
            .passwordInput,
        password,
    );

    await t.click(
        selectors
            .auth
            .signInButton,
    );

};

export const actions = {
    signIn,
};
