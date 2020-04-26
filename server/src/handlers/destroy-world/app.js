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

export const handler: ProxyHandler = async ( event, ) => {

    logger.debug(
        `received event: %o`,
        event,
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
            errorReason,
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
        worldId,
    } = bodyValidationResultBody;

    try {

        logger.info(
            `deleting world '%s' in '%s' environment`,
            worldId,
            environment,
        );

        const removeWorldPromise = database.worlds.remove(
            {
                key: {
                    environment,
                },
                logger,
                redis,
                value: worldId,
            },
        );

        const removeStatePromise = database.stateByWorld.remove(
            {
                key: {
                    environment,
                    worldId,
                },
                logger,
                redis,
            },
        );

        await Promise.all(
            [
                removeWorldPromise,
                removeStatePromise,
            ],
        );

        return generateRequestAcceptedResponse();

    } catch ( error ) {

        logger.error(
            error.stack,
        );

        return generateRequestExecutionErrorResponse(
            {
                reason: `unexpected error`,
            },
        );

    }

};
