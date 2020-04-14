// @flow

import type {
    JestExpect, JestMock, MockCalls,
} from './types';

export const expectCalls = (
    {
        expect,
        mockFunction,
        calls,
    }: $ReadOnly< {|
        expect: JestExpect,
        mockFunction: JestMock,
        calls: MockCalls,
    |} >,
): void => {

    expect(
        [
            ...mockFunction.mock.calls,
        ].sort(),
    )
        .toEqual(
            [
                ...calls,
            ].sort(),
        );

};

export const dummyJestMock: JestMock = {
    mock: {
        calls: [
            [],
        ],
    },
    mockImplementation: () => {

        return undefined;

    },
};
