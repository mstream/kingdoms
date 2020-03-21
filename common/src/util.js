// @flow

import { v4 } from 'uuid';
import type { CommonState } from './state/modules/types';

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

export const numberToDurationString = ({ value }: { value: number }): string => {
    if (value < 0) {
        throw Error('value cannot be negative');
    }
    if (value === 0) {
        return '0';
    }
    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    const hoursStr = hours > 0 ? `${hours}h` : '';
    const minutesStr = minutes > 0 ? `${minutes}m` : '';
    const delimiterStr = hours > 0 && minutes > 0 ? ' ' : '';

    return `${hoursStr}${delimiterStr}${minutesStr}`;
};

export const calculateTimeDelta = (
    {
        fromTime,
        toTime,
    }: {
        fromTime: string,
        toTime: string,
    },
): number => {
    return (Date.parse(toTime) - Date.parse(fromTime)) / 1000;
};

export const serializeState = ({ state }: { state: CommonState }): string => {
    return JSON.stringify(state);
};


