// @flow

import { v4 } from 'uuid';

const suffixes: $ReadOnlyArray<string> = [
    'k',
    'm',
    'g',
    't',
];

export const parseJson = (
    {
        json,
    }: {
        json: ?string
    },
): mixed => {
    if (json === undefined) {
        return undefined;
    }

    if (json === null) {
        return 'null';
    }

    return JSON.parse(json);
};

export const stringifyJson = (
    {
        value,
    }: {
        value: mixed
    },
): ?string => {
    return JSON.stringify(value);
};

export const generateId = (): string => {
    return v4();
};

export const numberToQuantityString = ({ value }: { value: number }): string => {
    const quantity = suffixes.reduce(
        (quantity, suffix) => {
            if (quantity.value / 10000 < 1) {
                return quantity;
            }
            return {
                value: quantity.value / 1000,
                suffix,
            };
        },
        { value, suffix: null },
    );
    return `${quantity.value.toString().substring(0, 4)}${quantity.suffix != null ? quantity.suffix : ''}`;
};