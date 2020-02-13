/**
 * @flow
 */

import AWS from 'aws-sdk';

import Redis from 'ioredis';
import type {APIGatewayProxyHandler} from '../types';

const initialState = {
    cities: [
        {
            id: '1',
            name: 'city1',
            location: {
                x: 0,
                y: 0,
            },
        },
        {
            id: '2',
            name: 'city2',
            location: {
                x: -3,
                y: -3,
            }
        },
        {
            id: '3',
            name: 'city3',
            location: {
                x: 3,
                y: 3,
            }
        },
    ],
    worldSizeInTiles: {
        x: 30,
        y: 30
    }
};

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

export const handler: APIGatewayProxyHandler = async (event, context) => {
    const {connectionId, domainName, stage} = event.requestContext;
    if (connectionId == null) {
        throw Error('missing connectionId');
    }
    if (domainName == null) {
        throw Error('missing domainName');
    }
    try {
        await redis.set('state', JSON.stringify(initialState));
        const state = JSON.parse(await redis.get('state'));
        const apiGatewayManagementApi = new AWS.ApiGatewayManagementApi({
            apiVersion: '2018-11-29',
            endpoint: `${domainName}/${stage}`
        });
        await apiGatewayManagementApi.postToConnection({
            ConnectionId: connectionId,
            Data: JSON.stringify({type: 'STATE_UPDATE', payload: state}),
        }).promise();
    } catch (error) {
        if (error.statusCode === 410) {
            console.log(`Found stale connection, deleting ${connectionId}`);
            try {
                await redis.srem('connection-ids', connectionId);
            } catch (error) {
                console.error(error.stack);
                return {statusCode: 500, body: 'Message send error.'};
            }
        } else {
            console.error(error.stack);
            return {statusCode: 500, body: 'Message send error.'};
        }
    }
    return {statusCode: 200, body: 'Message sent.'};
};
