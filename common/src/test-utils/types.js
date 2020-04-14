// @flow

export type MockCalls = $ReadOnlyArray< $ReadOnlyArray< mixed > >;

export type JestMock = $ReadOnly< {
    mock: $ReadOnly< { calls: MockCalls } >,
} >;

export type JestExpect = typeof expect;

export type Jest = {
    describe: typeof describe,
    expect: JestExpect,
    it: typeof it,
}
