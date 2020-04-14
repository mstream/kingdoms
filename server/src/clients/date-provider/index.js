// @flow

import type {
    DateProvider, MockGetCurrent,
} from './types';

// $FlowFixMe
export const mockGetCurrent: MockGetCurrent = null;

const getCurrent = (): Date => {

    return new Date();

};

export const createDateProvider = (): DateProvider => {

    return {
        getCurrent,
    };

};
