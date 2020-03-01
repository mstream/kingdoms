/**
 * @flow
 */

import {v4} from 'uuid';

export const parseJson = ({json}: { json: string }): mixed => {
    return JSON.parse(json);
};

export const generateId = (): string => {
    return v4();
};