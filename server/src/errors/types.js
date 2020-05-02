// @flow

export const ERROR_UNAUTHORIZED: 'ERROR_UNAUTHORIZED'
    = `ERROR_UNAUTHORIZED`;

export const ERROR_UNEXPECTED: 'ERROR_UNEXPECTED'
    = `ERROR_UNEXPECTED`;

export type ErrorKey =
    | typeof ERROR_UNAUTHORIZED
    | typeof ERROR_UNEXPECTED

export type ErrorCreator = (
    {
        cause?: Error,
        message: string,
    },
) => Error;
