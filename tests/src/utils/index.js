// @flow

import {
    ClientFunction,
} from 'testcafe';
import type {
    TestCafeError,
} from '../types';

export const validateTestCafeError = (
    {
        error,
    }: { error: mixed },
): ?TestCafeError => {

    if ( error == null || typeof error !== `object` ) {

        return null;

    }

    const isTestCafeError = error[ `isTestCafeError` ];

    if ( isTestCafeError == null || isTestCafeError === false ) {

        return null;

    }

    // $FlowFixMe
    return error;

};

export const getLocation = ClientFunction(
    () => {

        return window.location.href;

    },
);
