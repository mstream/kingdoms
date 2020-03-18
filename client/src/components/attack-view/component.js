// @flow

import React, { useState } from 'react';
import type { Props } from './props';
import { unitsOrder } from '../../assets/images/units';
import { AttackViewRegimentTemplateFormComponent } from './regiment-template-form';
import { AttackViewCityListComponent } from './city-list';
import type { CommonStateUnitKey } from '../../../../common/src/state/modules/rules/reducer/types';
import type { CommonStateRegimentTemplate } from '../../../../common/src/state/modules/types';

const initialRegimentTemplate: CommonStateRegimentTemplate = unitsOrder.reduce(
    (initialQuantities, unitType: CommonStateUnitKey) => {
        return {
            ...initialQuantities,
            // $FlowFixMe
            [unitType]: {
                from: 0,
                to: 0,
            },
        };
    },
    {},
);

export const testId = 'attack-view';

export const Component = (
    {
        attackedCity,
        closeAttackView,
    }: Props,
) => {
    if (attackedCity == null) {
        return null;
    }

    const [
        regimentTemplate,
        setRegimentTemplate,
    ] = useState(initialRegimentTemplate);

    const onBackgroundClick = () => {
        closeAttackView();
    };

    return (
        <div data-testid={testId}
             className="modal top-0 left-0 w-full h-full flex items-center justify-center rounded-t text-gray-100">
            <div
                onClick={onBackgroundClick}
                className="modal-overlay absolute w-full h-full bg-gray-900 opacity-75 top-0 left-0 cursor-pointer"
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
                            <AttackViewCityListComponent/>
                        </div>
                        <div className="w-1/3">
                            <AttackViewRegimentTemplateFormComponent
                                regimentTemplate={regimentTemplate}
                                setRegimentTemplate={setRegimentTemplate}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className="metal-bg flex flex-row justify-center w-full p-1 bg-gray-600">
                    <button
                        className="p-1 bg-green-500 rounded-lg cursor-pointer focus:outline-none">Attack
                    </button>
                </div>
            </div>
        </div>
    );
};
