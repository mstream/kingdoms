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


const isAtAppWorldPage = async (
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
            `${config.appUrl}/world.html`,
        );

};


export const expectations = {
    isAtAppWorldPage,
};
