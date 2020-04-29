// @flow


import {
    ERROR_STATE_NOT_INITIALIZED,
} from '../../../util';
import {
    database,
} from '../../../connectors/database';
import {
    generateRequestRejectionResponse,
} from '../../util';
import verror from 'verror';
import type {
    CommonPlayerAction,
} from '../../../../../common/src/state/types';
import type {
    Logger,
} from '../../../../../common/src/logging/types';
import type {
    Redis,
} from '../../../clients/redis/types';
import type {
    ServerResponse,
} from '../../../../../common/src/types';

export const handleUnsupportedAction = async (
    {
        action,
        environment,
        logger,
        redis,
        sendResponseBackToClient,
        worldId,
    }: {
        action: CommonPlayerAction,
        environment: string,
        logger: Logger,
        redis: Redis,
        sendResponseBackToClient: (
            {
                response: ServerResponse
            },
        ) => Promise< void >,
        worldId: string
    },
) => {

    const state = await database.stateByWorld.get(
        {
            key: {
                environment,
                worldId,
            },
            logger,
            redis,
        },
    );

    if ( state == null ) {

        throw new verror.VError(
            {
                name: ERROR_STATE_NOT_INITIALIZED,
            },
        );

    }

    await sendResponseBackToClient(
        {
            response: {
                errors: [
                    `unsupported action`,
                ],
                request: {
                    action,
                    worldId,
                },
                state,
            },
        },
    );

    const errorReason = `unsupported request type: ${ action.type }`;

    logger.warn(
        errorReason,
    );

    return generateRequestRejectionResponse(
        {
            reason: errorReason,
        },
    );

};
