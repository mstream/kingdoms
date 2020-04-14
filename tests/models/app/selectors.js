// @flow

import {
    Selector,
} from 'testcafe';
import {
    testIds,
} from '../../../common/src/ui';

export const selectors = {
    cityTile: Selector(
        `*[data-testid="${ testIds.COMPONENT_WORLD_MAP.CITY_TILE }"]`,
    ),
    newCityCreateButton: Selector(
        `*[data-testid="${ testIds.COMPONENT_GAME_START.CITY_CREATE_BUTTON }"]`,
    ),
    newCityNameInput: Selector(
        `*[data-testid="${ testIds.COMPONENT_GAME_START.CITY_NAME_INPUT }"]`,
    ),
    signOutButton: Selector(
        `*[data-testid="${ testIds.COMPONENT_MENU.SIGN_OUT_BUTTON }"]`,
    ),
    userMenuButton: Selector(
        `*[data-testid="${ testIds.COMPONENT_MENU.DROPDOWN_BUTTON }"]`,
    ),
};
