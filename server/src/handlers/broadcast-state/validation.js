// @flow


import {
    WorldStateUpdatePayloadType,
} from '../../connectors/queue/send-world-state-update/types';
import {
    parseJson,
} from '../../../../common/src/json';
import type {
    SqsEventRecord, SqsEventValidator,
} from '../types';
import type {
    WorldStateUpdatePayload,
} from '../../connectors/queue/send-world-state-update/types';

type Validator = SqsEventValidator< $ReadOnlyArray< WorldStateUpdatePayload > >;

export const validateStateUpdateEvent: Validator = (
    {
        event,
    },
) => {

    try {

        const {
            Records,
        } = event;

        if ( Records == null ) {

            return {
                errors: [
                    `Records is missing`,
                ],
            };

        }

        const payloads: $ReadOnlyArray< WorldStateUpdatePayload > = Records.map(
            (
                record: SqsEventRecord,
            ) => {

                const serializedPayload = record.body;
                const payload = parseJson(
                    {
                        value: serializedPayload,
                    },
                );
                return WorldStateUpdatePayloadType.assert(
                    payload,
                );

            },
        );

        return {
            errors: [],
            result: payloads,
        };

    } catch ( error ) {

        return {
            errors: [
                `validation error: ${ error.message }`,
            ],
        };

    }

};
