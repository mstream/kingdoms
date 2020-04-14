// @flow

import type {
    EventValidator,
} from '../types';
import type {
    CommonState,
} from '../../../../common/src/state/modules/types';
import {
    validateCommonStateType,
} from '../../../../common/src/validators';
import {
    parseJson,
} from '../../../../common/src/json';


export const validateEvent: EventValidator< $ReadOnly< {
    state: CommonState,
    worldId: string
} > > = (
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

        if ( request.state == null ) {

            return {
                errors: [
                    `body.state is missing`,
                ],
            };

        }

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

        const state: CommonState = validateCommonStateType(
            {
                toValidate: request.state,
            },
        );
        const worldId: string = bodyWorldId;

        return {
            errors: [],
            result: {
                state,
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
