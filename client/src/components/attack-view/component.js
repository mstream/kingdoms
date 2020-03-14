// @flow

import React from 'react';
import type { Props } from './props';

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
                className="bricks-bg absolute w-9/12 min-h-3/4 rounded-sm shadow-lg flex flex-col items-center justify-start text-2xl bg-gray-800">
                <div className="wood-bg flex flex-row items-stretch flex-none w-full bg-orange-800 justify-center">
                    <div className="font-bold text-2xl text-center text-gray-100">
                        {city.name}
                    </div>
                </div>
            </div>
        </div>
    );
};
