// @flow

import verror from 'verror';
import type {
    ErrorCreator, ErrorKey,
} from './types';

export const createErrorCreator = (
    {
        name,
    }: {
        name: ErrorKey,
    },
): ErrorCreator => {

    return (
        {
            cause,
            message,
        },
    ) => {

        return new verror.VError(
            {
                cause,
                name,
            },
            message,
        );

    };

};

