// @flow

import {v4} from 'uuid';

export const parseJson = ({json}: { json: ?string }): mixed => {
    // $FlowFixMe
    return JSON.parse(json);
};

export const stringifyJson = ({value}: { value: mixed }): ?string => {
    return JSON.stringify(value);
};

export const generateId = (): string => {
    return v4();
};