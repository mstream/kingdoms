// @flow

import {
    anyErrorsSelector,
} from './_impl/any-errors';
import {
    errorsSelector,
} from './_impl/errors';

export const clientStateErrorsSelectors = {
    anyErrors: anyErrorsSelector,
    errors   : errorsSelector,
};
