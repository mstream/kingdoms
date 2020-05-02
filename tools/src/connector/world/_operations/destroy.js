// @flow

import {
    invokeFunction,
} from '../../../client/lambda';
import {
    serializeJson,
} from '../../../../../common/src/json';

import type {
    Config,
} from '../../../config/types';
import type {
    Exec,
} from '../../../../../common/src/execute/types';
import type {
    Logger,
} from '../../../../../common/src/logging/types';


export const destroy = async (
    {
        config,
        exec,
        id,
        logger,
    }: $ReadOnly< {|
        config: Config,
        exec: Exec,
        id: string,
        logger: Logger,
    |} >,
) => {


    logger.info(
        {
            interpolationValues: [
                id,
            ],
            message: `deleting a world with id '%s'`,
        },
    );

    const requestPayload = {
        body: {
            worldId: id,
        },
    };

    const serializedRequestPayload = serializeJson(
        {
            json: requestPayload,
        },
    );

    if ( serializedRequestPayload == null ) {

        throw Error(
            `missing request payload`,
        );

    }

    await invokeFunction(
        {
            exec,
            logger,
            name   : config.destroyWorldFunctionName,
            payload: serializedRequestPayload,
        },
    );

};

