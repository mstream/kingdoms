// @flow
// @flow-runtime

export type Quantities = { [string]: number, ... }

export const addQuantities = ({quantities1, quantities2}: { quantities1: Quantities, quantities2: Quantities }) => {
    return [...Object.keys(quantities1), ...Object.keys(quantities2)].reduce((result, key) => {
            const quantity1 = quantities1[key] != null ? quantities1[key] : 0;
            const quantity2 = quantities2[key] != null ? quantities2[key] : 0;
            return {
                ...result,
                [key]: quantity1 + quantity2
            };
        },
        {}
    );
};

export const subtractQuantities = ({quantities1, quantities2}: { quantities1: Quantities, quantities2: Quantities }) => {
    return [...Object.keys(quantities1), ...Object.keys(quantities2)].reduce((result, key) => {
            const quantity1 = quantities1[key] != null ? quantities1[key] : 0;
            const quantity2 = quantities2[key] != null ? quantities2[key] : 0;
            return {
                ...result,
                [key]: quantity1 - quantity2
            };
        },
        {}
    );
};

export const multipleQuantities = ({quantities1, quantities2}: { quantities1: Quantities, quantities2: Quantities }) => {
    return [...Object.keys(quantities1), ...Object.keys(quantities2)].reduce((result, key) => {
            const quantity1 = quantities1[key] != null ? quantities1[key] : 0;
            const quantity2 = quantities2[key] != null ? quantities2[key] : 0;
            return {
                ...result,
                [key]: quantity1 * quantity2
            };
        },
        {}
    );
};

export const multipleQuantitiesByScalar = ({quantities, scalar}: { quantities: Quantities, scalar: number }): Quantities => {
    return Object.keys(quantities).reduce((result, key) => {
            const quantity = quantities[key] != null ? quantities[key] : 0;
            return {
                ...result,
                [key]: quantity * scalar
            };
        },
        {}
    );
};

export const divideQuantities = ({quantities1, quantities2}: { quantities1: Quantities, quantities2: Quantities }) => {
    return [...Object.keys(quantities1), ...Object.keys(quantities2)].reduce((result, key) => {
            const quantity1 = quantities1[key] != null ? quantities1[key] : 0;
            const quantity2 = quantities2[key] != null ? quantities2[key] : 0;
            return {
                ...result,
                [key]: quantity1 / quantity2
            };
        },
        {}
    );
};
