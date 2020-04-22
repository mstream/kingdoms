// @flow

import {
    numberToQuantityString,
} from '../../../../../common/src/utils';
import {
    testIds,
} from '../../../../../common/src/ui';
import React from 'react';
import classNames from 'classnames';
import type {
    CommonStateCity,
} from '../../../../../common/src/state/modules/cities/reducer/types';
import type {
    Props,
} from './props';

type CityWithDistance = {
    city: CommonStateCity,
    cityId: string,
    distance: number,
};

export const Component = (
    {
        attackingCityId,
        cities,
        cityIdsOwnedByPlayer,
        distancesToAttackedCity,
        selectAttackViewAttackingCity,
    }: Props,
) => {

    const playerCitiesWithDistance: $ReadOnlyArray< CityWithDistance > = cityIdsOwnedByPlayer
        .reduce(
            (
                playerCitiesWithDistance, cityId: string,
            ) => {

                return [
                    ...playerCitiesWithDistance,
                    {
                        city    : cities[ cityId ],
                        cityId,
                        distance: distancesToAttackedCity[ cityId ],
                    },
                ];

            },
            [],
        )
        .sort(
            (
                cityWithDistance1: CityWithDistance,
                cityWithDistance2: CityWithDistance,
            ) => {

                return cityWithDistance1.distance - cityWithDistance2.distance;

            },
        );

    const cityRows = playerCitiesWithDistance.map(
        (
            cityWithDistance: CityWithDistance,
        ) => {

            const {
                city, cityId, distance,
            } = cityWithDistance;
            const isSelected = cityId === attackingCityId;

            const className = classNames(
                `flex flex-col m-1 leading-tight cursor-pointer`,
                {
                    'bg-green-500': isSelected,
                },
            );

            const onClick = () => {

                selectAttackViewAttackingCity(
                    {
                        cityId,
                    },
                );

            };

            const quantityString = numberToQuantityString(
                {
                    value: distance,
                },
            );

            const unitSuffix = distance > 1
                ? `s`
                : ``;

            return (
                <div key={cityId} className={className} onClick={onClick}>
                    <div className="text-sm font-medium">{city.name}</div>
                    <div className="text-xs">
                        {`${ quantityString } square${ unitSuffix } away`}
                    </div>
                </div>
            );

        },
    );

    return (
        <div
            data-testid={testIds.attackView.cityList}
            className="flex flex-col justify-start text-xl"
        >
            <div className="mb-1">From city:</div>
            <div className="shadow-inner bg-gray-900-alpha-50">{cityRows}</div>
        </div>
    );

};
