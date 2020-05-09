// @flow

import stringify from 'json-stringify-deterministic';

export type Json = $ReadOnly< { [string]: mixed } > | $ReadOnlyArray< mixed >;

export const parseJson = (
    {
        value,
    }: { value: string },
): Json => {

    return JSON.parse(
        value,
    );

};

export const serializeJson = (
    {
        json,
    }: { json: Json },
): string => {

    return stringify(
        json,
    );

};
