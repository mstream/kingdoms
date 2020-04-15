// @flow


import {
    database,
} from '../../../connectors/database';
import {
    generateRequestAcceptedResponse,
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

export const handleGetCurrentStateAction = async (
    {
        action,
        connectionId,
        environment,
        logger,
        playerId,
        redis,
        sendResponseBackToClient,
        worldId,
    }: {
            action: CommonPlayerAction,
            connectionId: string,
            environment: string,
            logger: Logger,
            playerId: string,
            redis: Redis,
            sendResponseBackToClient: ( { response: ServerResponse } ) => Promise< void >,
            worldId: string
        },
) => {

    const getWorldStatePromise = database.stateByWorld.get(
        {
            key: {
                environment,
                worldId,
            },
            logger,
            redis,
        },
    );

    const addPlayerConnectionPromise = database.connectionByPlayer.set(
        {
            key: {
                environment,
                playerId,
            },
            logger,
            redis,
            value: connectionId,
        },
    );

    const addPlayerWorldPromise = database.worldByPlayer.set(
        {
            key: {
                environment,
                playerId,
            },
            logger,
            redis,
            value: worldId,
        },
    );

    const addPlayerToWorldPromise = database.playersByWorld.add(
        {
            key: {
                environment,
                worldId,
            },
            logger,
            redis,
            value: playerId,
        },
    );

    const [
        state,
    ] = await Promise.all(
        [
            getWorldStatePromise,
            addPlayerConnectionPromise,
            addPlayerToWorldPromise,
            addPlayerWorldPromise,
        ],
    );

    if ( state == null ) {

        throw new verror.VError(
            {
                name: `STATE_NOT_INITIALIZED`,
            },
        );

    }

    await sendResponseBackToClient(
        {
            response: {
                errors : [],
                request: {
                    action,
                    worldId,
                },
                state,
            },
        },
    );

    return generateRequestAcceptedResponse();

};
