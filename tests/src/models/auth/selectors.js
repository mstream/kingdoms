// @flow

import {
    Selector,
} from 'testcafe';

export const selectors = {
    passwordInput: Selector(
        `#signInFormPassword`,
    )
        .nth(
            1,
        ),
    signInButton: Selector(
        `input[type="submit"]`,
    )
        .nth(
            1,
        ),
    usernameInput: Selector(
        `#signInFormUsername`,
    )
        .nth(
            1,
        ),
};
