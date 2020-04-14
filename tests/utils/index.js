// @flow

import {
    ClientFunction,
} from 'testcafe';


export const getLocation = ClientFunction(
    () => {
        return window.location.href;
    },
);

