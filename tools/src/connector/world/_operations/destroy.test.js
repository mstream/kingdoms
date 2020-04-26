// @flow

import {
    destroy,
} from './destroy';

import {
    emptyConfig,
} from '../../../config';
import {
    emptyLogger,
} from '../../../../../common/src/logging';
import {
    serializeJson,
} from '../../../../../common/src/json';

describe(
    `destroy`,
    () => {

        it(
            `destroys world`,
            async () => {

                const config = {
                    ...emptyConfig,
                    destroyWorldFunctionName: `function1`,
                };

                const exec = jest.fn(
                    () => {

                        return Promise.resolve(
                            {
                                stderr: ``,
                                stdout: ``,
                            },
                        );

                    },
                );

                const id = `world1`;

                const logger = {
                    ...emptyLogger,
                };

                await destroy(
                    {
                        config,
                        exec,
                        id,
                        logger,
                    },
                );

                const expectedPayload = serializeJson(
                    {
                        json: {
                            body: {
                                worldId: `world1`,
                            },
                        },
                    },
                );

                expect(
                    exec.mock.calls,
                )
                    .toEqual(
                        [
                            [
                                `aws lambda invoke `
                                + `--function-name function1 `
                                + `--invocation-type RequestResponse `
                                + `--payload '${ expectedPayload }' `
                                + `/dev/stdout`,
                            ],
                        ],
                    );

            },
        );

    },
);
