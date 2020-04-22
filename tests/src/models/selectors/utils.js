// @flow

import {
    Selector,
} from "testcafe";

import type {
    ElementIds,
} from '../../../../common/src/ui/types';
import type {
    ElementSelectors,
} from './types';

export const generateSelectors = <K: string>(
    {
        ids,
    }: $ReadOnly< {|
        ids: ElementIds< K >,
    |} >,
): ElementSelectors< K > => {

    return Object
        .keys(
            ids,
        )
        .reduce(
            (
                generatedSelectors, key: K,
            ) => {

                const elementId = ids[ key ];

                const selector = Selector(
                    `*[data-testid="${ elementId }"]`,
                );

                return {
                    ...generatedSelectors,
                    [ key ]: selector,
                };

            },
            ids,
        );

};
