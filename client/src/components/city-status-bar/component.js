// @flow

import React from 'react';
import classNames from 'classnames';
import {calculateBuildingTierSum} from '../../../../common/src/state';
import type {Props} from './props';

export const Component = ({city, player}: Props) => {

    if (player == null) {
        return null;
    }

    const tiersSum = calculateBuildingTierSum({buildings: city.buildings});

    const isAbandoned = city.ownerId === null;
    const doesBelongToPlayer = city.ownerId === player.name;
    const doesBelongToEnemy = !isAbandoned && !doesBelongToPlayer;

    const className = classNames(
        'absolute left-1/2 transform -translate-x-1/2 flex flex-row text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-center rounded-lg text-gray-100',
        {
            'bg-gray-500-alpha-50': isAbandoned,
            'bg-green-500-alpha-50': doesBelongToPlayer,
            'bg-red-500-alpha-50': doesBelongToEnemy,
        }
    );

    return (
        <div className={className}>
            <div
                className="p-1 font-bold border-r border-gray-900">{tiersSum}
            </div>
            <div className="p-1 font-normal">{city.name}
            </div>
        </div>
    );
};
