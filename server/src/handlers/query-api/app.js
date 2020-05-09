// @flow


import {
    createConfig,
} from '../../config';
import {
    createLogger,
} from '../../../../common/src/logging';
import {
    createRedisClient,
} from '../../clients/redis';
import {
    generateRequestAcceptedResponse,
    generateRequestExecutionErrorResponse, generateRequestRejectionResponse,
} from '../util';


import {
    errorCreators,
    tryCatch,
} from '../../../../common/src/errors';


import {
    resolveQuery,
} from './graphql';
import {
    validateGraphqlRequestEvent,
} from './validation';
import type {
    ProxyHandler,
} from '../types';


const config = createConfig();

const logger = createLogger(
    {
        config,
    },
);


const redis = createRedisClient(
    {
        config,
    },
);


export const handler: ProxyHandler
    = async ( event, ) => {

        const expectedErrorNames = [];

        const execution = async () => {

            logger.debug(
                {
                    interpolationValues: [
                        event,
                    ],
                    message: `received event: %o`,
                },
            );

            const {
                environment,
            } = config;

            const eventValidationResult = validateGraphqlRequestEvent(
                {
                    event,
                },
            );

            if ( eventValidationResult.errors.length > 0 ) {

                const errorReason = `event validation error: ${ JSON.stringify(
                    eventValidationResult.errors,
                ) }`;

                logger.warn(
                    {
                        message: errorReason,
                    },
                );

                return generateRequestRejectionResponse(
                    {
                        reason: errorReason,
                    },
                );

            }

            const eventValidationResultEvent = eventValidationResult.result;

            if ( eventValidationResultEvent == null ) {

                throw errorCreators.unexpected(
                    {
                        message:  `missing event`,
                    },
                );

            }

            const {
                query,
            } = eventValidationResultEvent;

            const worldIds = await resolveQuery(
                {
                    environment,
                    logger,
                    query,
                    redis,
                },
            );


            const serializedWorldIds = JSON.stringify(
                worldIds,
            );

            return generateRequestAcceptedResponse(
                {
                    body: serializedWorldIds,
                },
            );

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

            return generateRequestExecutionErrorResponse(
                {
                    reason: error.message,
                },
            );

        }

    };
