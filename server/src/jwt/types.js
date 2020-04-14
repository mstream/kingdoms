// @flow

import type {
    Cognito,
} from '../clients/cognito/types';

type UserProfile = $ReadOnly< {
    name: string,
} >;

export type UserProfileResult = $ReadOnly< {
    errors: $ReadOnlyArray< string >,
    userProfile: ?UserProfile,
} >;

export type BuildUserProfileArgs = [$ReadOnly< {
    cognito: Cognito,
    token: string,
} >]

export type BuildUserProfileResult = Promise< UserProfileResult >

export type BuildUserProfile = ( ...BuildUserProfileArgs ) => BuildUserProfileResult
export type MockBuildUserProfile = JestMockFn< BuildUserProfileArgs, BuildUserProfileResult >;
