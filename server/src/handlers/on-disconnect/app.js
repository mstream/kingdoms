// @flow

import { createRedisClient } from '../../clients/redis';
import type {ProxyHandler} from '../types';
import { addConnection, removeConnection } from '../../connectors/database';
import { config } from '../../config';

const redis = createRedisClient();

export const handler: ProxyHandler = async (event, context) => {
    try {
        const connectionId = event.requestContext.connectionId;

        if (connectionId == null) {
            throw Error('connectionId is missing');
        }

        await removeConnection({
            connectionId,
            environment: config.environment,
            redis,
        });
    } catch (error) {
        console.error(error.stack);
        return { statusCode: 500, body: 'Disconnect error.' };
    }
    return { statusCode: 200, body: 'Disconnected.' };
};
