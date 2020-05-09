// @flow


import {
    ServerRequestType,
} from '../../../../common/src/types';
import {
    parseJson,
} from '../../../../common/src/json';
import type {
    ProxyEventValidator,
} from '../types';
import type {
    ServerRequest,
} from '../../../../common/src/types';

export const validateServerRequestEvent: ProxyEventValidator< $ReadOnly< {|
    connectionId: string,
    serverRequest: ServerRequest,
    username: string,
|} > > = (
    {
        event,
    },
) => {

    const {
        authorizer, connectionId,
    } = event.requestContext;

    if ( authorizer == null ) {

        return {
            errors: [
                `authorizer is missing`,
            ],
        };

    }

    if ( connectionId == null ) {

        return {
            errors: [
                `connectionId is missing`,
            ],
        };


    }

    const username = authorizer.principalId;

    if ( username == null || typeof username !== `string` ) {

        return {
            errors: [
                `username is missing`,
            ],
        };

    }

    if ( event.body == null ) {

        return {
            errors: [
                `invalid api gateway body received`,
            ],
        };

    }

    const request = event.body instanceof Object
        ? event.body
        : parseJson(
            {
                value: event.body.toString(),
            },
        );

    if (
        request == null
        || typeof request !== `object`
        || Array.isArray(
            request,
        )
    ) {

        return {
            errors: [
                `invalid api gateway body received`,
            ],
        };

    }

    try {

        const serverRequest = ServerRequestType.assert(
            request.data,
        );

        return {
            errors: [],
            result: {
                connectionId,
                serverRequest,
                username,
            },
        };

    } catch ( error ) {

        return {
            errors: [
                `validation error: ${ error.message }`,
            ],
        };

    }

};
