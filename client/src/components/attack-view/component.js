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
                    'flex flex-col m-1 leading-tight cursor-pointer',
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
            <div
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
                        <p className="text-sm text-center font-medium">
                            {numberToQuantityString({ value: unitQuantity })}
                        </p>
                        <ImageComponent
                            image={unitVisual.image}
                            ratio="100%"
                        />
                        <p className="text-xs text-center">{unitVisual.name}</p>
                    </div>
                    <div className="flex flex-col m-1">
                        <div className="flex flex-row justify-end">
                            <label>from</label>
                            <input type="number" min="0" max="9999" maxLength="4" className={inputClassName}/>
                        </div>
                        <div className="flex flex-row justify-end">
                            <label>to</label>
                            <input type="number" min="0" max="9999" maxLength="4" className={inputClassName}/>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div
                className="flex flex-col items-center justify-start shadow-inner">
                {unitRows}
            </div>
        );
    };


    const onBackgroundClick = () => {
        closeAttackView();
    };

    return (
        <div data-testid={testId}
             className="modal top-0 left-0 w-full h-full flex items-center justify-center rounded-t text-gray-100">
            <div
                onClick={onBackgroundClick}
                className="modal-overlay absolute w-full h-full bg-black opacity-75 top-0 left-0 cursor-pointer"
            />
            <div
                className="bricks-bg absolute w-9/12 min-h-3/4 rounded-sm shadow-lg flex flex-col items-center justify-between bg-gray-800">
                <div className="w-full">
                    <div
                        className="wood-bg flex flex-row items-stretch flex-none w-full bg-orange-800 justify-center">
                        <div
                            className="font-bold text-2xl text-center">
                            {attackedCity.name}
                        </div>
                    </div>
                    <div className="flex flex-row justify-around w-full">
                        <div className="w-1/3">
                            {createCityListComponent()}
                        </div>
                        <div className="w-1/3">
                            {createRegimentTemplateComponent()}
                        </div>
                    </div>
                </div>
                <div
                    className="metal-bg flex flex-row justify-center w-full p-1 bg-gray-600">
                    <button
                        className="p-1 bg-green-500 rounded-lg">Attack
                    </button>
                </div>
            </div>
        </div>
    );
};
