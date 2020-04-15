// @flow

import {
    AttackViewCityListComponent,
} from './city-list';
import {
    AttackViewRegimentTemplateFormComponent,
} from './regiment-template-form';
import {
    AttackViewSchedulerFormComponent,
} from './scheduler-form';
import {
    testIds,
} from '../../../../common/src/ui';
import React from 'react';
import classNames from 'classnames';
import type {
    Props,
} from './props';

export const Component = (
    {
        attackedCity,
        attackedCityId,
        attackingCityId,
        closeAttackView,
        isFormSubmitting,
        isFormValid,
        minimumDelay,
        regimentTemplate,
        requestOrderCreation,
    }: Props,
) => {

    if ( attackedCity == null ) {

        return null;

    }

    const onBackgroundClick = () => {

        closeAttackView();

    };

    const onScheduleActionClick = () => {

        requestOrderCreation(
            {
                minimumDelay,
                originCityId: attackingCityId,
                regimentTemplate,
                targetCityId: attackedCityId,
            },
        );

    };

    const buttonClassName = classNames(
        `p-1 text-lg rounded-lg focus:outline-none text-gray-100 bg-green-600`,
        {
            'cursor-not-allowed': !isFormValid && !isFormSubmitting,
            'cursor-pointer'    : isFormValid && !isFormSubmitting,
            'cursor-wait'       : isFormSubmitting,
            'filter-grayscale'  : !isFormValid && !isFormSubmitting,
            'hover:bg-green-400': isFormValid && !isFormSubmitting,
            'spinner'           : isFormSubmitting,
        },
    );

    return (
        <div
            data-testid={testIds.COMPONENT_ATTACK_VIEW.PARENT}
            className={classNames(
                `modal`,
                `top-0`,
                `left-0`,
                `w-full`,
                `h-full`,
                `flex`,
                `items-center`,
                `justify-center`,
                `rounded-t`,
                `text-gray-100`,
            )}
        >
            <div
                onClick={onBackgroundClick}
                className={classNames(
                    `absolute`,
                    `bg-gray-900`,
                    `cursor-pointer`,
                    `h-full`,
                    `left-0`,
                    `modal-overlay`,
                    `opacity-75`,
                    `top-0`,
                    `w-full`,
                )}
            />
            <div
                className={classNames(
                    `absolute`,
                    `bg-gray-800`,
                    `bricks-bg`,
                    `flex`,
                    `flex-col`,
                    `items-center`,
                    `justify-between`,
                    `min-h-3/4`,
                    `overflow-hidden`,
                    `rounded-sm`,
                    `shadow-lg`,
                    `w-9/12`,
                )}
            >
                <div
                    className={classNames(
                        `wood-bg`,
                        `flex`,
                        `flex-row`,
                        `items-stretch`,
                        `flex-none`,
                        `w-full`,
                        `bg-orange-800`,
                        `justify-center`,
                    )}>
                    <div className="font-bold text-2xl text-center">
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
