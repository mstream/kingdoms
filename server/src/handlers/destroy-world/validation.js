// @flow

import {
    parseJson,
} from '../../../../common/src/json';


import type {
    ProxyEventValidator,
} from '../types';


export const validateEvent: ProxyEventValidator< $ReadOnly< {|
    worldId: string
|} > > = (
    {
        event,
    },
) => {

    const {
        body,
    } = event;

    if ( body == null ) {

        return {
            errors: [
                `body is missing`,
            ],
        };

    }

    try {

        const request = body instanceof Object
            ? body
            : parseJson(
                {
                    value: body.toString(),
                },
            );

        if ( request.worldId == null ) {

            return {
                errors: [
                    `body.worldId is missing`,
                ],
            };

        }

        const bodyWorldId = request.worldId;

        if ( typeof bodyWorldId !== `string` ) {

            return {
                errors: [
                    `body.worldId is not as string`,
                ],
            };

        }

        const worldId: string = bodyWorldId;

        return {
            errors: [],
            result: {
                worldId,
            },
        };

    } catch ( error ) {

        return {
            errors: [
                `body parsing error: ${ error.message }`,
            ],
        };

    }

};
