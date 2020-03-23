// @flow

import React from 'react';
import type { Props } from './props';
import { AttackViewRegimentTemplateFormComponent } from './regiment-template-form';
import { AttackViewCityListComponent } from './city-list';
import { AttackViewSchedulerFormComponent } from './scheduler-form';
import classNames from 'classnames';

export const testId = 'attack-view';

export const Component = (
    {
        attackedCity,
        attackedCityId,
        attackingCityId,
        closeAttackView,
        isFormValid,
        minimumDelay,
        regimentTemplate,
        requestOrderCreation,
    }: Props,
) => {
    if (attackedCity == null) {
        return null;
    }

    const onBackgroundClick = () => {
        closeAttackView();
    };

    const onScheduleActionClick = () => {
        requestOrderCreation({
            minimumDelay,
            originCityId: attackingCityId,
            regimentTemplate,
            targetCityId: attackedCityId,
        });
    };

    const buttonClassName = classNames(
        'p-1 text-lg rounded-lg focus:outline-none text-gray-100 bg-green-600',
        {
            'cursor-not-allowed': !isFormValid,
            'cursor-pointer': isFormValid,
            'filter-grayscale': !isFormValid,
            'hover:bg-green-400': isFormValid,
        },
    );

    return (
        <div data-testid={testId}
             className="modal top-0 left-0 w-full h-full flex items-center justify-center rounded-t text-gray-100">
            <div
                onClick={onBackgroundClick}
                className="modal-overlay absolute w-full h-full bg-gray-900 opacity-75 top-0 left-0 cursor-pointer"
            />
            <div
                className="bricks-bg absolute w-9/12 min-h-3/4 rounded-sm shadow-lg flex flex-col items-center justify-between overflow-hidden bg-gray-800">
                <div
                    className="wood-bg flex flex-row items-stretch flex-none w-full bg-orange-800 justify-center">
                    <div
                        className="font-bold text-2xl text-center">
                        {attackedCity.name}
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex flex-col justify-around w-full">
                        <div className="flex flex-row justify-around">
                            <div className="w-1/3 m-1">
                                <AttackViewCityListComponent/>
                            </div>
                            <div className="w-1/3 m-1">
                                <AttackViewSchedulerFormComponent/>
                            </div>
                        </div>
                        <div className="w-full m-1">
                            <AttackViewRegimentTemplateFormComponent/>
                        </div>
                    </div>
                </div>
                <div
                    className="metal-bg flex flex-row justify-center w-full p-1 bg-gray-600">
                    <button
                        className={buttonClassName}
                        onClick={onScheduleActionClick}
                    >
                        Schedule Attack
                    </button>
                </div>
            </div>
        </div>
    );
};
