// @flow

import {
    emptyApiGatewayProxyEvent, emptyContext,
} from '../util';
import {
    emptyCommonState,
} from '../../../../common/src/state/modules/state';
import {
    handler,
} from './app';
import {
    mockSadd, mockSet,
} from '../../clients/redis';
import {
    stringifyJson,
} from '../../../../common/src/json';
import {
    stubConfig,
} from '../../config';
import type {
    APIGatewayProxyEvent, Context,
} from '../types';

jest.mock(
    `../../config`,
);

jest.mock(
    `../../clients/redis`,
);

describe(
    `onResetStateHandler`,
    () => {

        it(
            ``,
            async () => {

                const context: Context = {
                    ...emptyContext,
                };

                const callback = () => {

                    return undefined;

                };

                const state = {
                    ...emptyCommonState,
                };
                const worldId = `world1`;

                const event: APIGatewayProxyEvent = {
                    ...emptyApiGatewayProxyEvent,
                    body: stringifyJson(
                        {
                            json: {
                                state,
                                worldId,
                            },
                        },
                    ),
                };

                mockSadd.mockImplementation(
                    () => {

                        return Promise.resolve(
                            1,
                        );

                    },
                );

                mockSet.mockImplementation(
                    () => {

                        return Promise.resolve(
                            `OK`,
                        );

                    },
                );

                const expected = {
                    body      : `Request accepted.`,
                    statusCode: 200,
                };

                const actual = await handler(
                    event,
                    context,
                    callback,
                );

                expect(
                    actual,
                )
                    .toEqual(
                        expected,
                    );

                expect(
                    mockSadd.mock.calls,
                )
                    .toEqual(
                        [
                            [
                                `worlds:${ stubConfig.environment }`,
                                `world1`,
                            ],
                        ],
                    );

                expect(
                    mockSet.mock.calls,
                )
                    .toEqual(
                        [
                            [
                                `state-by-world:${ stubConfig.environment }:world1`,
                                stringifyJson(
                                    {
                                        json: state,
                                    },
                                ),
                            ],
                        ],
                    );

            },
        );

    },
);
