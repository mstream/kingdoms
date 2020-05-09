// @flow

import {
    TestController,
} from 'testcafe';
import {
    config,
} from '../../../config';
import {
    getLocation,
} from '../../../utils';

const isAtAppMainPage = async (
    {
        t,
    }: {
        t: TestController
    },
) => {

    await t.expect(
        getLocation(),
    )
        .contains(
            `${ config.appUrl }`,
        );

};


export const expectations = {
    isAtAppMainPage,
};
