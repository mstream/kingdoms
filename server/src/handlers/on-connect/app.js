// @flow

import type {
    ProxyHandler,
} from '../types';

const requestExecutionError = {
    body      : `Connection error.`,
    statusCode: 500,
};

const requestAccepted = {
    body      : `Connected.`,
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

        return requestAccepted;

    } catch ( error ) {

        console.error(
            error.stack,
        );

        return requestExecutionError;

    }

};
