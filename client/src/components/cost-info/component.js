// @flow

import React from 'react';
import type { Props } from './props';
import classNames from 'classnames';
import { numberToQuantityString } from '../../../../common/src/util';
import { convertQuantitiesToResources } from '../../../../common/src/resource';
import { subtractQuantities } from '../../../../common/src/quantity';

export const testId = 'cost-info';

export const Component = ({ availableResources, requiredResources }: Props) => {
    const availableResourcesAfter = convertQuantitiesToResources({
        quantities: subtractQuantities({
            quantities1: availableResources,
            quantities2: requiredResources,
        }),
    });

    const requiredResourceComponents = Object.keys(requiredResources).map(
        (resourceType) => {
            const requiredResource = requiredResources[resourceType];
            const availableResourceAfter =
                availableResourcesAfter[resourceType];

            const className = classNames({
                'text-red-500': availableResourceAfter < 0,
                'text-green-500': availableResourceAfter >= 0,
            });

            return (
                <p
                    key={resourceType}
                    className="text-xs text-center font-medium text-gray-900"
                >
                    {resourceType}:
                    <i className={className}>
                        {numberToQuantityString({ value: requiredResource })}
                    </i>
                </p>
            );
        },
    );
    return (
        <div
            data-testid={testId}
            className="flex flex-col m-1 rounded-sm bg-gray-100 shadow-2xs"
        >
            {requiredResourceComponents}
        </div>
    );
};
