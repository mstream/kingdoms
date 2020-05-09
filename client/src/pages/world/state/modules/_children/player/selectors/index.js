// @flow

import {
    isAuthenticatedSelector,
} from './_impl/is-authenticated';
import {
    nameSelector,
} from './_impl/name';

export const clientStatePlayerSelectors = {
    isAuthenticated: isAuthenticatedSelector,
    name           : nameSelector,
};
