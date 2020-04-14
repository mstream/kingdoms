// @flow

import {
    TestController,
} from 'testcafe';
import {
    getLocation,
} from '../../utils';
import {
    config,
} from '../../config';

const isAtAppPage = async (
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
            config.appUrl,
        );

};


export const expectations = {
    isAtAppPage,
};
