// @flow


import { errorsSelector } from './_impl/errors';
import { anyErrorsSelector } from './_impl/any-errors';

export const clientStateErrorsSelectors = {
    anyErrors: anyErrorsSelector,
    errors: errorsSelector,
};
