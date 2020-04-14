// @flow

import {
    nameSelector,
} from './_impl/name';
import {
    isAuthenticatedSelector,
} from './_impl/is-authenticated';

export const clientStatePlayerSelectors = {
    isAuthenticated: isAuthenticatedSelector,
    name           : nameSelector,
};
