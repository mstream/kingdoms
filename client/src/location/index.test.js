// @flow

import {
    emptyConfig,
} from '../config';
import {
    emptyLogger,
} from '../../../common/src/logging';
import {
    getWorldId,
    redirectToLoginPage,
    redirectToLogoutPage,
} from './index';
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
                    replace: mockReplace,
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
                                + `&redirect_uri=http://localhost`,
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
                    replace: mockReplace,
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
                                + `&redirect_uri=http://localhost`,
                            ],
                        ],
                    );

            },
        );

    },
);

