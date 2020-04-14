// @flow

import {
    Selector,
} from 'testcafe';

export const selectors = {
    cityTile: Selector(
        `*[data-testid="city-tile"]`,
    ),
    newCityCreateButton: Selector(
        `*[data-testid="new-city-create-button"]`,
    ),
    newCityNameInput: Selector(
        `*[data-testid="new-city-name-input"]`,
    ),
    signOutButton: Selector(
        `*[data-testid="user-menu-sign-out-button"]`,
    ),
    userMenuButton: Selector(
        `*[data-testid="user-menu-button"]`,
    ),
};
