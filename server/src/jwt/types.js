// @flow


type UserProfile = $ReadOnly<{
    name: string,
}>;

export type UserProfileResult = $ReadOnly<{
    errors: $ReadOnlyArray<string>,
    userProfile: ?UserProfile,
}>;