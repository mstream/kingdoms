// @flow

export type Quantities = $ReadOnly< { [string]: number } >;

export const addQuantities = (
    {
        quantities1,
        quantities2,
    }: {
        quantities1: Quantities,
        quantities2: Quantities,
    },
) => {

    return [
        ...Object.keys(
            quantities1,
        ),
        ...Object.keys(
            quantities2,
        ),
    ].reduce(
        (
            result, key,
        ) => {

            const quantity1 = quantities1[ key ] == null
                ? 0
                : quantities1[ key ];

            const quantity2 = quantities2[ key ] == null
                ? 0
                : quantities2[ key ];
            return {
                ...result,
                [ key ]: quantity1 + quantity2,
            };

        },
        {
        },
    );

};

export const subtractQuantities = (
    {
        quantities1,
        quantities2,
    }: {
        quantities1: Quantities,
        quantities2: Quantities,
    },
): Quantities => {

    return [
        ...Object.keys(
            quantities1,
        ),
        ...Object.keys(
            quantities2,
        ),
    ].reduce(
        (
            result, key,
        ) => {

            const quantity1 = quantities1[ key ] == null
                ? 0
                : quantities1[ key ];

            const quantity2 = quantities2[ key ] == null
                ? 0
                : quantities2[ key ];
            return {
                ...result,
                [ key ]: quantity1 - quantity2,
            };

        },
        {
        },
    );

};

export const multipleQuantities = (
    {
        quantities1,
        quantities2,
    }: {
        quantities1: Quantities,
        quantities2: Quantities,
    },
) => {

    return [
        ...Object.keys(
            quantities1,
        ),
        ...Object.keys(
            quantities2,
        ),
    ].reduce(
        (
            result, key,
        ) => {

            const quantity1 = quantities1[ key ] == null
                ? 0
                : quantities1[ key ];

            const quantity2 = quantities2[ key ] == null
                ? 0
                : quantities2[ key ];
            return {
                ...result,
                [ key ]: quantity1 * quantity2,
            };

        },
        {
        },
    );

};

export const multipleQuantitiesByScalar = (
    {
        quantities,
        scalar,
    }: {
        quantities: Quantities,
        scalar: number,
    },
): Quantities => {

    return Object.keys(
        quantities,
    )
        .reduce(
            (
                result, key,
            ) => {

                const quantity = quantities[ key ] == null
                    ? 0
                    : quantities[ key ];
                return {
                    ...result,
                    [ key ]: quantity * scalar,
                };

            },
            {
            },
        );

};

export const divideQuantities = (
    {
        quantities1,
        quantities2,
    }: {
        quantities1: Quantities,
        quantities2: Quantities,
    },
): Quantities => {

    return [
        ...Object.keys(
            quantities1,
        ),
        ...Object.keys(
            quantities2,
        ),
    ].reduce(
        (
            result, key,
        ) => {

            const quantity1 = quantities1[ key ] == null
                ? 0
                : quantities1[ key ];

            const quantity2 = quantities2[ key ] == null
                ? 0
                : quantities2[ key ];
            return {
                ...result,
                [ key ]: quantity1 / quantity2,
            };

        },
        {
        },
    );

};
