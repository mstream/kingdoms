// @flow

import React from 'react';
import type { Props } from './props';
import { unitsOrder, unitVisuals } from '../../assets/images/units';
import { numberToQuantityString } from '../../../../common/src/util';
import { ImageComponent } from '../image';
import { UNIT_PEASANT } from '../../../../common/src/state';

export const testId = 'attack-view';


export const Component = (
    {
        city,
        cityId,
        closeAttackView,
    }: Props) => {

    if (cityId == null || city == null) {
        return null;
    }

    const unitRows = unitsOrder.map(unitType => {

        if (unitType === UNIT_PEASANT) {
            return null;
        }

        const unitQuantity = city.units[unitType];
        const unitVisual = unitVisuals[unitType];

        const inputClassName = 'm-1 text-xl cursor-text';

        return (
            <div key={unitType} className="flex flex-row flex-1 p-1">
                <div className="h-10 w-10 m-1">
                    <p className="text-sm text-center font-medium text-gray-100">{numberToQuantityString({ value: unitQuantity })}</p>
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
                        {city.name}
                    </div>
                </div>
                <div className="flex flex-row justify-around w-full">
                    <div
                        className="flex flex-col justify-start text-2xl text-gray-100">
                        <p>city1</p>
                        <p>city2</p>
                        <p>city3</p>
                    </div>
                    <div
                        className="flex flex-col items-center justify-start">
                        {unitRows}
                    </div>
                </div>
                <div
                    className="flex flex-row justify-center p-1 mb-2 rounded-lg bg-green-500 text-gray-100">
                    <button>Attack</button>
                </div>
            </div>
        </div>
    );
};
