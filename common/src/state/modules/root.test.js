// @flow

import {
    rootReducer,
} from './root';
import {
    initialCommonState,
} from '../index';
import type {
    CommonState, CommonStateReducerResult,
} from './types';
import {
    emptyCommonState,
} from './state';
import {
    success,
} from './utils';
import {
    dummy, resetState,
} from '../actions';

describe(
    `rootReducer`,
    () => {

        it(
            `returns the default state on reset state action`,
            () => {

                const action = resetState();

                const previousState: CommonState = {
                    ...emptyCommonState,
                };

                const expected: CommonStateReducerResult< CommonState > = success(
                    {
                        state: initialCommonState,
                    },
                );

                const actual = rootReducer(
                    {
                        action,
                        state: previousState,
                    },
                );

                expect(
                    actual,
                )
                    .toEqual(
                        expected,
                    );

            },
        );

        it(
            `returns the current state on unsupported action`,
            () => {

                const action = dummy();

                const previousState: CommonState = {
                    ...emptyCommonState,
                };

                const expected: CommonStateReducerResult< CommonState > = success(
                    {
                        state: previousState,
                    },
                );

                const actual = rootReducer(
                    {
                        action,
                        state: previousState,
                    },
                );

                expect(
                    actual,
                )
                    .toEqual(
                        expected,
                    );

            },
        );

    },
);
