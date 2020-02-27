/**
 * @flow
 */

export const parseJson = ({json}: { json: string }): mixed => {
    return JSON.parse(json);
};