// @flow

import {
    createWorld,
} from './index';
import {
    emptyCommonState,
} from '../../../../common/src/state/modules/state';
import {
    emptyConfig,
} from '../../config';
import {
    emptyLogger,
} from '../../../../common/src/logging';
import {
    stringifyJson,
} from '../../../../common/src/json';

describe(
    `createWorld`,
    () => {

        it(
            `creates world`,
            async () => {

                const config = {
                    ...emptyConfig,
                    resetStateFunctionName: `function1`,
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

                const state = emptyCommonState;

                await createWorld(
                    {
                        config,
                        exec,
                        id,
                        logger,
                        state,
                    },
                );

                const expectedPayload = stringifyJson(
                    {
                        json: {
                            body: {
                                state,
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
