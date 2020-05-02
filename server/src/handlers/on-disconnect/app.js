// @flow

import {
    createConfig,
} from '../../config';
import {
    createLogger,
} from '../../../../common/src/logging';
import {
    tryCatch,
} from '../../errors';
import type {
    ProxyHandler,
} from '../types';

const requestExecutionErrorResponse = {
    body      : `Disconnection error.`,
    statusCode: 500,
};

const requestAcceptedResponse = {
    body      : `Disconnected.`,
    statusCode: 200,
};

const config = createConfig();

const logger = createLogger(
    {
        config,
    },
);

export const handler: ProxyHandler
    = async ( event, ) => {

        const expectedErrorNames = [];

        const execution = async () => {

            const {
                connectionId,
            } = event.requestContext;

            if ( connectionId == null ) {

                logger.error(
                    {
                        message: `connectionId is missing`,
                    },
                );

                return requestExecutionErrorResponse;

            }

            return requestAcceptedResponse;

        };

        try {

            return await tryCatch(
                {
                    execution,
                    expectedErrorNames,
                },
            );

        } catch ( error ) {

            logger.error(
                {
                    error,
                    message: error.message,
                },
            );

            return requestExecutionErrorResponse;

        }

    };
