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
    database,
} from '../../connectors/database';
import {
    generateRequestAcceptedResponse,
    generateRequestExecutionErrorResponse,
    generateRequestRejectionResponse,
} from '../util';
import {
    tryCatch,
} from '../../errors';
import {
    validateEvent,
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

            const bodyValidationResult = validateEvent(
                {
                    event,
                },
            );

            if ( bodyValidationResult.errors.length > 0 ) {

                const errorReason = `body validation error: ${ JSON.stringify(
                    bodyValidationResult.errors,
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

            const bodyValidationResultBody = bodyValidationResult.result;

            if ( bodyValidationResultBody == null ) {

                throw Error(
                    `missing body validation result`,
                );

            }

            const {
                environment,
            } = config;

            const {
                state,
                worldId,
            } = bodyValidationResultBody;

            logger.info(
                {
                    interpolationValues: [
                        worldId,
                        environment,
                    ],
                    message: `resetting state for world '%s' in '%s' environment`,
                },
            );

            const addWorldPromise = database.worlds.add(
                {
                    key: {
                        environment,
                    },
                    logger,
                    redis,
                    value: worldId,
                },
            );

            const setStatePromise = database.stateByWorld.set(
                {
                    key: {
                        environment,
                        worldId,
                    },
                    logger,
                    redis,
                    value: state,
                },
            );

            await Promise.all(
                [
                    addWorldPromise,
                    setStatePromise,
                ],
            );

            return generateRequestAcceptedResponse();

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
