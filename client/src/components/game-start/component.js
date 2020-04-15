// @flow

import {
    testIds,
} from '../../../../common/src/ui';
import React, {
    useState,
} from 'react';
import classNames from 'classnames';
import type {
    Props,
} from './props';

export const Component = (
    {
        isCityBeingCreated,
        isGameStarting,
        requestCityCreation,
    }: Props,
) => {

    const [
        nameDraft,
        setNameDraft,
    ] = useState(
        ``,
    );

    if ( !isGameStarting ) {

        return null;

    }

    const buttonClassName = classNames(
        `p-1 text-lg rounded-lg focus:outline-none text-gray-100 bg-green-600`,
        {
            'cursor-not-allowed': nameDraft.length === 0,
            'cursor-pointer'    : !isCityBeingCreated && nameDraft.length > 0,
            'cursor-wait'       : isCityBeingCreated,
            'filter-grayscale'  : nameDraft.length === 0,
            'hover:bg-green-400': !isCityBeingCreated && nameDraft.length > 0,
            'spinner'           : isCityBeingCreated,
        },
    );

    const onClick = () => {

        if ( nameDraft.length === 0 ) {

            return;

        }

        requestCityCreation(
            {
                name: nameDraft,
            },
        );

    };

    return (
        <div
            data-testid={testIds.COMPONENT_GAME_START.PARENT}
            className="modal top-0 left-0 w-full h-full flex items-center justify-center rounded-t"
        >
            <div
                className={classNames(
                    `modal-overlay`,
                    `absolute`,
                    `w-full`,
                    `h-full`,
                    `bg-black`,
                    `opacity-75`,
                    `top-0`,
                    `left-0`,
                    `cursor-pointer`,
                )}/>
            <div
                className={classNames(
                    `bricks-bg`,
                    `absolute`,
                    `w-6/12`,
                    `rounded-sm`,
                    `shadow-lg`,
                    `flex`,
                    `flex-col`,
                    `items-center`,
                    `justify-center`,
                    `text-2xl`,
                    `bg-gray-800`,
                )}
            >
                <div
                    className={classNames(
                        `wood-bg`,
                        `flex`,
                        `flex-row`,
                        `items-stretch`,
                        `flex-none`,
                        `justify-between`,
                        `w-full`,
                        `bg-orange-800`,
                    )}>
                    <div className="flex flex-row items-center justify-center">
                        <p className="font-bold text-2xl text-center text-gray-100">
                            Start game
                        </p>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <div className="w-1/3">
                            <label
                                className="text-gray-500 font-bold text-right"
                                htmlFor="new-city-name"
                            >
                                City name
                            </label>
                        </div>
                        <div className="w-2/3">
                            <input
                                id="new-city-name-input"
                                data-testid={testIds.COMPONENT_GAME_START.CITY_NAME_INPUT}
                                className={classNames(
                                    `appearance-none`,
                                    `border-none`,
                                    `w-full`,
                                    `leading-tight`,
                                    `focus:outline-none`,
                                    `text-gray-900`,
                                    `bg-gray-100`,
                                    `cursor-text`,
                                )}
                                type="text"
                                placeholder="London"
                                onChange={(
                                    event,
                                ) => {

                                    setNameDraft(
                                        event.target.value,
                                    );

                                }}
                            />
                        </div>
                    </div>
                    <button
                        data-testid={testIds.COMPONENT_GAME_START.CITY_CREATE_BUTTON}
                        className={buttonClassName}
                        onClick={onClick}
                    >
                        Start
                    </button>
                </div>
            </div>
        </div>
    );

};
