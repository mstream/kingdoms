// @flow

import type {
    MockBuildUserProfile,
} from '../types';

export const mockBuildUserProfile: MockBuildUserProfile = jest.fn(
    () => {

        return Promise.reject(
            Error(
                `unsupported`,
            ),
        );

    },
);

export const buildUserProfile = mockBuildUserProfile;
