// @flow

import {
    serializeJson,
} from '../../../../../common/src/json';
import type {
    Sqs,
} from '../../../clients/sqs/types';
import type {
    WorldStateUpdatePayload,
} from './types';


export const sendWorldStateUpdate = async ( {
    payload, sqs, queueUrl,
}: { payload: WorldStateUpdatePayload, sqs: Sqs, queueUrl: string }, ): Promise< void > => {

    const serializedPayload: string = serializeJson(
        {
            json: payload,
        },
    );

    if ( serializedPayload == null ) {

        throw Error(
            `missing payload`,
        );

    }

    return await sqs
        .sendMessage(
            {
                MessageBody: serializedPayload,
                QueueUrl   : queueUrl,
            },
        )
        .promise();

};
