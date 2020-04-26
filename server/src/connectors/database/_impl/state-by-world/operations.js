// @flow

import {
    createDatabaseValueOperations,
} from '../../_abstract/value';
import {
    createKey,
} from './key';
import {
    parseJson, serializeJson,
} from '../../../../../../common/src/json';
import {
    validateCommonStateType,
} from '../../../../../../common/src/validators';
import type {
    CommonState,
} from '../../../../../../common/src/state/modules/types';
import type {
    DatabaseStatesByWorldKey,
} from './types';
import type {
    ValueDeserializer, ValueSerializer,
} from '../../types';

const commonStateDeserializer: ValueDeserializer< CommonState > = (
    {
        serializedValue,
    },
) => {

    const json = parseJson(
        {
            value: serializedValue,
        },
    );
    return validateCommonStateType(
        {
            toValidate: json,
        },
    );

};

const commonStateSerializer: ValueSerializer< CommonState > = (
    {
        value,
    },
) => {

    return serializeJson(
        {
            json: value,
        },
    );

};

export const operations = createDatabaseValueOperations<DatabaseStatesByWorldKey,
    CommonState,
    >(
        {
            keyCreator       : createKey,
            valueDeserializer: commonStateDeserializer,
            valueSerializer  : commonStateSerializer,
        },
    );
