// @flow

import {
    invokeFunction,
} from './index';
import {
    emptyLogger,
} from '../../../../common/src/logging';

describe(
    `invokeFunction`,
    () => {

        it(
            `produces a valid command`,
            async () => {

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


                const logger = {
                    ...emptyLogger,
                };

                const name = `function1`;
                const payload = `payload`;

                await invokeFunction(
                    {
                        exec,
                        logger,
                        name,
                        payload,
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
                                + `--payload 'payload' `
                                + `/dev/stdout`,
                            ],
                        ],
                    );

            },
        );

    },
);
