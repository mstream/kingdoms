// @flow

import React from 'react';
import classNames from 'classnames';
import { calculateBuildingTierSum } from '../../../../common/src/state';
import type { Props } from './props';

export const testId = 'city-status-bar';

export const Component = ({ city, player }: Props) => {

    if (player == null) {
        return null;
    }

    const tiersSum = calculateBuildingTierSum({ buildings: city.buildings });

    const isAbandoned = city.ownerId === null;
    const doesBelongToPlayer = city.ownerId === player.name;
    const doesBelongToEnemy = !isAbandoned && !doesBelongToPlayer;

    const className = classNames(
        'absolute left-1/2 transform -translate-x-1/2 flex flex-row items-stretch text-center rounded-lg text-gray-100',
        {
            'bg-gray-500-alpha-50': isAbandoned,
            'bg-green-500-alpha-50': doesBelongToPlayer,
            'bg-red-500-alpha-50': doesBelongToEnemy,
        },
    );

    return (
        <div data-testid={testId}
             className={className}>
            <div
                className="flex items-center p-1 text-md font-bold border-r border-gray-900">{tiersSum}
            </div>
            <div>
                <div
                    className="p-1 pb-0 text-sm font-normal border-b border-gray-900">{city.name}</div>
                <div
                    className="p-1 pt-0 text-xs font-hairline">{city.ownerId}</div>
            </div>

        </div>
    );
};
