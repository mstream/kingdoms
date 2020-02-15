/**
 * @flow
 */

import AWS from 'aws-sdk';
import type {APIGatewayProxyHandler} from '../types';
import {createClient} from '../redis';
import type {ServerState} from '../../../../common/src/types';

const initialState: ServerState = {
    cities: [
        {
            id: '1',
            name: 'city1',
            location: {
                x: 0,
                y: 0,
            },
            resources: [
                {
                    type: 'FOOD',
                    quantity: 100
                },
                {
                    type: 'WOOD',
                    quantity: 200
                },
            ]
        },
        {
            id: '2',
            name: 'city2',
            location: {
                x: -3,
                y: -3,
            },
            resources: [
                {
                    type: 'FOOD',
                    quantity: 50
                },
                {
                    type: 'WOOD',
                    quantity: 100
                },
            ]
        },
        {
            id: '3',
            name: 'city3',
            location: {
                x: 3,
                y: 3,
            },
            resources: [
                {
                    type: 'FOOD',
                    quantity: 25
                },
                {
                    type: 'WOOD',
                    quantity: 50
                },
            ]
        },
    ],
    worldSizeInTiles: {
        x: 30,
        y: 30
    }
};

const redis = createClient();

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
