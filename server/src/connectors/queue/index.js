// @flow


import {
    sendWorldStateUpdate,
} from './send-world-state-update';
import type {
    Config,
} from '../../config/types';
import type {
    Logger,
} from '../../../../common/src/logging/types';
import type {
    Sqs,
} from '../../clients/sqs/types';
import type {
    WorldStateUpdatePayload,
} from './send-world-state-update/types';

export const createQueueConnector = (
    {
        config,
    }: { config: Config },
) => {

    const decoratedSendWorldStateUpdate = async (
        {
            logger,
            payload,
            sqs,
        }: {
            logger: Logger,
            payload: WorldStateUpdatePayload,
            sqs: Sqs
        },
    ): Promise< void > => {

        const queueUrl = config.sqs.queueUrls.worldStateUpdate;

        logger.debug(
            `sending a world update to queue: '%s'`,
            queueUrl,
        );

        return await sendWorldStateUpdate(
            {
                payload,
                queueUrl,
                sqs,
            },
        );

    };

    return {
        sendWorldStateUpdate: decoratedSendWorldStateUpdate,
    };

};
