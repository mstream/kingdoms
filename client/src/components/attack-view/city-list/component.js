// @flow

import React from 'react';
import type { Props } from './props';
import type { CommonStateCity } from '../../../../../common/src/state';
import classNames from 'classnames';
import { numberToQuantityString } from '../../../../../common/src/util';

export const testId = 'attack-view-city-list';

export const Component = (
    {
        attackingCityId,
        cities,
        cityIdsOwnedByPlayer,
        distancesToAttackedCity,
        selectAttackViewAttackingCity,
    }: Props,
) => {
    const playerCitiesWithDistance: $ReadOnlyArray<{
        city: CommonStateCity,
        cityId: string,
        distance: number
    }> = cityIdsOwnedByPlayer
        .reduce(
            (playerCitiesWithDistance, cityId: string) => {
                return [
                    ...playerCitiesWithDistance,
                    {
                        city: cities[cityId],
                        cityId,
                        distance: distancesToAttackedCity[cityId],
                    },
                ];
            },
            [],
        ).sort(
            (cityWithDistance1, cityWithDistance2) => {
                return cityWithDistance1.distance - cityWithDistance2.distance;
            },
        );

    const cityRows = playerCitiesWithDistance.map(
        (cityWithDistance: { city: CommonStateCity, cityId: string, distance: number }) => {
            const { city, cityId, distance } = cityWithDistance;
            const isSelected = cityId === attackingCityId;

            const className = classNames(
                'flex flex-col m-1 leading-tight cursor-pointer',
                {
                    'bg-green-500': isSelected,
                },
            );

            const onClick = (event) => {
                selectAttackViewAttackingCity({ cityId });
            };

            return (
                <div key={cityId} className={className} onClick={onClick}>
                    <div className="text-sm font-medium">{city.name}</div>
                    <div className="text-xs">
                        {`${numberToQuantityString({ value: distance })} square${distance > 1 ? 's' : ''} away`}
                    </div>
                </div>
            );
        },
    );

    return (
        <div
            data-testid={testId}
            className="flex flex-col justify-start text-xl">
            <div className="mb-1">
                From city:
            </div>
            <div className="shadow-inner bg-gray-900-alpha-50">
                {cityRows}
            </div>
        </div>
    );
};
