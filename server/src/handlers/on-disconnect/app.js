// @flow

import type {
    ProxyHandler,
} from '../types';

const requestExecutionError = {
    body      : `Disconnection error.`,
    statusCode: 500,
};

const requestAccepted = {
    body      : `Disconnected.`,
    statusCode: 200,
};

export const handler: ProxyHandler = async ( event, ) => {

    try {

        const {
            connectionId,
        } = event.requestContext;

        if ( connectionId == null ) {

            throw Error(
                `connectionId is missing`,
            );

        }

    } catch ( error ) {

        console.error(
            error.stack,
        );

        return requestExecutionError;

    }

    return requestAccepted;

};
