// @flow

import {
    convertQuantitiesToResources,
} from '../../../../common/src/resource';
import {
    numberToQuantityString,
} from '../../../../common/src/utils';
import {
    subtractQuantities,
} from '../../../../common/src/quantity';
import {
    testIds,
} from '../../../../common/src/ui';
import React from 'react';
import classNames from 'classnames';
import type {
    Props,
} from './props';

export const Component = (
    {
        availableResources, requiredResources,
    }: Props,
) => {

    const availableResourcesAfter = convertQuantitiesToResources(
        {
            quantities: subtractQuantities(
                {
                    quantities1: availableResources,
                    quantities2: requiredResources,
                },
            ),
        },
    );

    const requiredResourceComponents = Object.keys(
        requiredResources,
    )
        .map(
            (
                resourceType,
            ) => {

                const requiredResource = requiredResources[ resourceType ];
                const availableResourceAfter
                = availableResourcesAfter[ resourceType ];

                const className = classNames(
                    {
                        'text-green-500': availableResourceAfter >= 0,
                        'text-red-500'  : availableResourceAfter < 0,
                    },
                );

                return (
                    <p
                        key={resourceType}
                        className="text-xs text-center font-medium text-gray-900"
                    >
                        {resourceType}:
                        <i className={className}>
                            {numberToQuantityString(
                                {
                                    value: requiredResource,
                                },
                            )}
                        </i>
                    </p>
                );

            },
        );
    return (
        <div
            data-testid={testIds.COMPONENT_COST_INFO.PARENT}
            className="flex flex-col m-1 rounded-sm bg-gray-100 shadow-2xs"
        >
            {requiredResourceComponents}
        </div>
    );

};
