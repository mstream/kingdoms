// @flow

import {
    invokeFunction,
} from '../../client/lambda';
import {
    stringifyJson,
} from '../../../../common/src/json';
import type {
    CommonState,
} from '../../../../common/src/state/modules/types';
import type {
    Config,
} from '../../config/types';
import type {
    Exec,
} from '../../../../common/src/execute/types';
import type {
    Logger,
} from '../../../../common/src/logging/types';


export const createWorld = async ( {
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
        `creating a world with id '%s'`,
        id,
    );

    const requestPayload = {
        body: {
            state,
            worldId: id,
        },
    };

    const serializedRequestPayload = stringifyJson(
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

export const world = {
    createWorld,
};
