// @flow

import React from 'react';
import type { Props } from './props';
import { unitsOrder, unitVisuals } from '../../assets/images/units';
import { numberToQuantityString } from '../../../../common/src/util';
import { ImageComponent } from '../image';
import type { CommonStateCity } from '../../../../common/src/state';
import { UNIT_PEASANT } from '../../../../common/src/state';
import classNames from 'classnames';


export const testId = 'attack-view';


export const Component = (
    {
        attackedCityId,
        attackingCityId,
        cities,
        cityDistances,
        cityIdsOwnedByPlayer,
        closeAttackView,
        selectAttackViewAttackingCityAction,
    }: Props,
) => {

    if (attackedCityId == null) {
        return null;
    }

    const attackedCity = cities[attackedCityId];

    const createCityListComponent = () => {
        const distances: { [string]: number, ... } = cityDistances[attackedCityId];

        const playerCitiesWithDistance: $ReadOnlyArray<{ city: CommonStateCity, cityId: string, distance: number }> = cityIdsOwnedByPlayer
            .reduce(
                (playerCitiesWithDistance, cityId: string) => {
                    return [
                        ...playerCitiesWithDistance,
                        {
                            city: cities[cityId],
                            cityId,
                            distance: distances[cityId],
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
                    'flex flex-col leading-tight cursor-pointer',
                    {
                        'bg-green-500': isSelected,
                    },
                );

                const onClick = (event) => {
                    selectAttackViewAttackingCityAction({ cityId });
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
            <div className="flex flex-row justify-around w-full">
                <div
                    className="flex flex-col justify-start text-2xl text-gray-100">
                    {cityRows}
                </div>
            </div>
        );
    };


    const createRegimentTemplateComponent = () => {
        if (attackingCityId == null) {
            return null;
        }

        const attackingCity = cities[attackingCityId];

        const unitRows = unitsOrder.map(unitType => {

            if (unitType === UNIT_PEASANT) {
                return null;
            }

            const unitQuantity = attackingCity.units[unitType];
            const unitVisual = unitVisuals[unitType];

            const inputClassName = 'm-1 text-xl cursor-text';

            return (
                <div key={unitType} className="flex flex-row flex-1 p-1">
                    <div className="h-10 w-10 m-1">
                        <p className="text-sm text-center font-medium text-gray-100">
                            {numberToQuantityString({ value: unitQuantity })}
                        </p>
                        <ImageComponent
                            image={unitVisual.image}
                            ratio="100%"
                        />
                        <p className="text-xs text-center text-gray-100">{unitVisual.name}</p>
                    </div>
                    <div className="flex flex-col m-1">
                        <input type="number" className={inputClassName}/>
                        <input type="number" className={inputClassName}/>
                    </div>
                </div>
            );
        });

        return (
            <div
                className="flex flex-col items-center justify-start">
                {unitRows}
            </div>
        );
    };


    const onBackgroundClick = () => {
        closeAttackView();
    };

    return (
        <div data-testid={testId}
             className="modal top-0 left-0 w-full h-full flex items-center justify-center rounded-t">
            <div
                onClick={onBackgroundClick}
                className="modal-overlay absolute w-full h-full bg-black opacity-75 top-0 left-0 cursor-pointer"
            />
            <div
                className="bricks-bg absolute w-9/12 min-h-3/4 rounded-sm shadow-lg flex flex-col items-center justify-between bg-gray-800">
                <div
                    className="wood-bg flex flex-row items-stretch flex-none w-full bg-orange-800 justify-center">
                    <div
                        className="font-bold text-2xl text-center text-gray-100">
                        {attackedCity.name}
                    </div>
                </div>
                <div className="flex flex-row justify-left w-full">
                    {createCityListComponent()}
                    {createRegimentTemplateComponent()}
                </div>
                <div
                    className="flex flex-row justify-center p-1 mb-2 rounded-lg bg-green-500 text-gray-100">
                    <button>Attack</button>
                </div>
            </div>
        </div>
    );
};
