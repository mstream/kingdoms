// @flow

import {
    parseJson,
} from './json';
import {
    v4,
} from 'uuid';
import {
    validateServerResponseType,
} from './validators';
import randomString from 'crypto-random-string';
import type {
    CommonState,
} from './state/modules/types';
import type {
    ServerResponse,
} from './types';

const suffixes: $ReadOnlyArray< string > = [
    `k`,
    `m`,
    `g`,
    `t`,
];

export const generateId = (): string => {

    return v4();

};

export const generatePassword = (): string => {

    const upperCasePart = randomString(
        {
            characters: `ABCDEFGHIJKLMNOPQRSTUVWXYZ`,
            length    : 1,
        },
    );

    const lowerCasePart = randomString(
        {
            characters: `abcdefghijklmnopqrstuvwxyz`,
            length    : 5,
        },
    );

    const numericPart = randomString(
        {
            length: 3,
            type  : `numeric`,
        },
    );

    const symbolPart = randomString(
        {
            characters: `!@$`,
            length    : 1,
        },
    );

    return `${ upperCasePart }${ lowerCasePart }${ numericPart }${ symbolPart }`;

};

export const generateCityName = (): string => {

    const upperCasePart = randomString(
        {
            characters: `ABCDEFGHIJKLMNOPQRSTUVWXYZ`,
            length    : 1,
        },
    );

    const lowerCasePart = randomString(
        {
            characters: `abcdefghijklmnopqrstuvwxyz`,
            length    : 5,
        },
    );

    return `${ upperCasePart }${ lowerCasePart }`;

};


export const numberToQuantityString = (
    {
        value,
    }: {
        value: number,
    },
): string => {

    const quantity = suffixes.reduce(
        (
            quantity, suffix,
        ) => {

            if ( quantity.value / 10000 < 1 ) {

                return quantity;

            }

            return {
                suffix,
                value: quantity.value / 1000,
            };

        },
        {
            suffix: null,
            value,
        },
    );

    const amountStr = quantity.value.toString()
        .substring(
            0,
            4,
        );

    const suffixStr = quantity.suffix == null
        ? ``
        : quantity.suffix;


    return `${ amountStr }${ suffixStr }`;

};

export const serializeState = (
    {
        state,
    }: { state: CommonState },
): string => {

    return JSON.stringify(
        state,
    );

};

export const parseServerResponse = (
    {
        json,
    }: {
        json: string,
    },
): ServerResponse => {

    const object = parseJson(
        {
            value: json,
        },
    );
    return validateServerResponseType(
        {
            toValidate: object,
        },
    );

};

export const getDuplicates = (
    {
        items,
    }: { items: $ReadOnlyArray< string > },
): $ReadOnlyArray< string > => {

    const itemFrequencies = items.reduce(
        (
            itemFrequencies, item: string,
        ) => {

            if ( itemFrequencies[ item ] == null ) {

                return {
                    ...itemFrequencies,
                    [ item ]: 1,
                };

            }

            return {
                ...itemFrequencies,
                [ item ]: itemFrequencies[ item ] + 1,
            };

        },
        {
        },
    );

    return Object.keys(
        itemFrequencies,
    )
        .filter(
            (
                item: string,
            ) => {

                return itemFrequencies[ item ] > 1;

            },
        );

};
