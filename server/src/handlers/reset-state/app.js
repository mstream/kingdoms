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
        state,
        worldId,
    } = bodyValidationResultBody;

    try {

        logger.info(
            `resetting state for world '%s' in '%s' environment`,
            worldId,
            environment,
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
