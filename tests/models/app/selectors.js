// @flow

import {
    Selector,
} from 'testcafe';

export const selectors = {
    signOutButton: Selector(
        `*[data-testid="user-menu-sign-out-button"]`,
    ),
    userMenuButton: Selector(
        `*[data-testid="user-menu-button"]`,
    ),
};
