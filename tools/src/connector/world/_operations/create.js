// @flow

import {
    invokeFunction,
} from '../../../client/lambda';
import {
    serializeJson,
} from '../../../../../common/src/json';
import type {
    CommonState,
} from '../../../../../common/src/state/modules/types';
import type {
    Config,
} from '../../../config/types';
import type {
    Exec,
} from '../../../../../common/src/execute/types';
import type {
    Logger,
} from '../../../../../common/src/logging/types';


export const create = async ( {
    config,
    exec,
    id,
    logger,
    state,
}: {
    config: Config,
    exec: Exec,
    id: string,
    logger: Logger,
    state: CommonState,
}, ) => {

    logger.info(
        {
            interpolationValues: [
                id,
            ],
            message: `creating a world with id '%s'`,
        },
    );

    const requestPayload = {
        body: {
            state,
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
            name   : config.resetStateFunctionName,
            payload: serializedRequestPayload,
        },
    );

};
