/**
 * @flow
 */

export const EMPTY_OBJECT = Object.freeze({});

export const parseJson = ({json}: { json: string }): mixed => {
    return JSON.parse(json);
};