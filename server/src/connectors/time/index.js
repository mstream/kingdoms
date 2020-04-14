// @flow

import type {
    DateProvider,
} from '../../clients/date-provider/types';

export const getCurrentTime = (
    {
        dateProvider,
    }: {
    dateProvider: DateProvider,
},
): string => {

    const date = dateProvider.getCurrent();

    return date.toISOString();

};
