// @flow

import type {
    DateProvider, MockGetCurrent,
} from '../types';

export const mockGetCurrent: MockGetCurrent = jest.fn(
    () => {

        throw Error(
            `mockGetCurrent`,
        );

    },
);

export const createDateProvider = (): DateProvider => {

    return {
        getCurrent: mockGetCurrent,
    };

};
