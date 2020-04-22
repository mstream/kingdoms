// @flow


import type {
    ElementIds,
} from './types';

export const generateIds = <K: string>(
    {
        ids,
        prefix,
    }: $ReadOnly< {|
        ids: ElementIds< K >,
        prefix: string
    |} >,
): ElementIds< K > => {

    return Object
        .keys(
            ids,
        )
        .reduce(
            (
                generatedIds, key: string,
            ) => {

                return {
                    ...generatedIds,
                    [ key ]: `${ prefix }/${ key }`,
                };

            },
            ids,
        );

};
