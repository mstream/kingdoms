// @flow

import {
    createKey,
} from './key';
import type {
    DatabaseStatesByWorldKey,
} from './types';
import type {
    CommonState,
} from '../../../../../../common/src/state/modules/types';
import type {
    ValueDeserializer, ValueSerializer,
} from '../../types';
import {
    parseJson, stringifyJson,
} from '../../../../../../common/src/json';
import {
    createDatabaseValueOperations,
} from '../../_abstract/value';
import {
    validateCommonStateType,
} from '../../../../../../common/src/validators';

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

    return stringifyJson(
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
