// @flow

import {
    createWorldPageUrl,
    getWorldId,
    redirectToLoginPage,
    redirectToLogoutPage,
} from './index';
import {
    emptyConfig,
} from '../config';
import {
    emptyLogger,
} from '../../../common/src/logging';
import type {
    Config,
} from '../config/types';

describe(
    `getWorldId`,
    () => {

        it(
            `extract the world id parameter from the location`,
            () => {

                // $FlowFixMe
                const location: Location = {
                    hash: `#param1=1&state=state1&param2=2`,
                };

                const logger = {
                    ...emptyLogger,
                };

                const expected = `state1`;

                const actual = getWorldId(
                    {
                        location,
                        logger,
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


describe(
    `redirectToLoginPage`,
    () => {

        it(
            `redirects to login page`,
            () => {

                const config: Config = {
                    ...emptyConfig,
                    clientId  : `client1`,
                    cognitoUrl: `cognitoUrl`,
                };

                const mockReplace = jest.fn();

                // $FlowFixMe
                const location: Location = {
                    origin  : `scheme://domain2.domain1`,
                    pathname: `/path`,
                    replace : mockReplace,
                };

                const logger = {
                    ...emptyLogger,
                };

                redirectToLoginPage(
                    {
                        config,
                        location,
                        logger,
                    },
                );

                expect(
                    mockReplace.mock.calls,
                )
                    .toEqual(
                        [
                            [
                                `cognitoUrl/login`
                                + `?client_id=client1`
                                + `&response_type=token`
                                + `&scope=email+openid`
                                + `&redirect_uri=scheme://domain2.domain1/path`,
                            ],
                        ],
                    );

            },
        );

    },
);


describe(
    `redirectToLogoutPage`,
    () => {

        it(
            `redirects to login page`,
            () => {

                const config: Config = {
                    ...emptyConfig,
                    clientId  : `client1`,
                    cognitoUrl: `cognitoUrl`,
                };

                const mockReplace = jest.fn();

                // $FlowFixMe
                const location: Location = {
                    origin  : `scheme://domain2.domain1`,
                    pathname: `/path`,
                    replace : mockReplace,
                };

                const logger = {
                    ...emptyLogger,
                };

                redirectToLogoutPage(
                    {
                        config,
                        location,
                        logger,
                    },
                );

                expect(
                    mockReplace.mock.calls,
                )
                    .toEqual(
                        [
                            [
                                `cognitoUrl/logout`
                                + `?client_id=client1`
                                + `&response_type=token`
                                + `&scope=email+openid`
                                + `&redirect_uri=scheme://domain2.domain1/path`,
                            ],
                        ],
                    );

            },
        );

    },
);

describe(
    `createWorldPageUrl`,
    () => {

        it(
            `creates a valid url`,
            () => {

                // $FlowFixMe
                const location: Location = {
                    href: `scheme://domain2.domain1/path/#param1=val1&param2=val2`,
                };

                const worldId = `world1`;

                const expected = `scheme://domain2.domain1/path/world.html#`
                    + `param1=val1&param2=val2&state=world1`;

                const actual = createWorldPageUrl(
                    {
                        location,
                        worldId,
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

