// @flow

import {
    ERROR_UNAUTHORIZED, ERROR_UNEXPECTED,
} from './types';
import {
    createErrorCreator,
} from './utils';
import type {
    ErrorKey,
} from './types';

const unauthorized = createErrorCreator(
    {
        name: ERROR_UNAUTHORIZED,
    },
);

const unexpected = createErrorCreator(
    {
        name: ERROR_UNEXPECTED,
    },
);

export const errorCreators = {
    unauthorized,
    unexpected,
};

export const tryCatch = async <T>(
    {
        execution,
        expectedErrorNames,
    }: {
        execution: () => Promise< T >,
        expectedErrorNames: $ReadOnlyArray< ErrorKey >,
    },
): Promise< T > => {

    try {

        return await execution();

    } catch ( error ) {

        if ( expectedErrorNames.includes(
            error.name,
        ) ) {

            throw error;

        }

        throw errorCreators.unexpected(
            {
                cause  : error,
                message: `unexpected error`,
            },
        );

    }

};
