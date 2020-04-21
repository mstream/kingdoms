// @flow

import {
    getRefValue,
} from '../../../utils';
import {
    testIds,
} from '../../../../../common/src/ui';
import React, {
    useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import type {
    Props,
} from './props';

export const Component = (
    {
        city,
        cityId,
        nextCityId,
        openCityView,
        previousCityId,
        requestCityNameChange,
    }: Props,
) => {

    const nameInputRef = useRef(
        null,
    );

    const [
        isNameBeingEdited,
        setNameBeingEdited,
    ] = useState(
        false,
    );

    const [
        nameDraft,
        setNameDraft,
    ] = useState(
        ``,
    );

    useEffect(
        () => {

            if ( isNameBeingEdited ) {

                getRefValue(
                    {
                        ref: nameInputRef,
                    },
                )
                    .focus();

            }

        },
        [
            isNameBeingEdited,
        ],
    );

    if ( city == null || cityId == null ) {

        return null;

    }

    const onCityNameInputChange = (
        event,
    ) => {

        setNameDraft(
            event.target.value,
        );

    };

    const onCityNameInputClick = () => {

        setNameDraft(
            city.name,
        );

        setNameBeingEdited(
            true,
        );

    };

    const onCityNameInputBlur = () => {

        setNameBeingEdited(
            false,
        );

    };

    const onCityNameInputKeyDown = (
        event,
    ) => {

        switch ( event.key ) {

        case `Enter`: {

            setNameBeingEdited(
                false,
            );

            requestCityNameChange(
                {
                    cityId,
                    name: nameDraft,
                },
            );

            break;

        }

        case `Escape`: {

            setNameBeingEdited(
                false,
            );

            break;

        }

        }

    };

    const cityNameInput = isNameBeingEdited ? (
        <input
            data-testid={testIds.COMPONENT_CITY_VIEW.NAME}
            ref={nameInputRef}
            type="text"
            defaultValue={nameDraft}
            className="text-center"
            onChange={onCityNameInputChange}
            onBlur={onCityNameInputBlur}
            onKeyDown={onCityNameInputKeyDown}
        />
    ) : (
        <p
            data-testid={testIds.COMPONENT_CITY_VIEW.NAME}
            className="font-bold text-2xl text-center cursor-text hover:border text-gray-100"
            onClick={onCityNameInputClick}
        >
            {city.name}
        </p>
    );

    const isNavigationEnabled = previousCityId != null || nextCityId != null;

    const className = classNames(
        `wood-bg flex flex-row items-stretch flex-none w-full bg-orange-800`,
        {
            'justify-between': isNavigationEnabled,
            'justify-center' : !isNavigationEnabled,
        },
    );

    const navigateToNextCityButton = (
        {
            nextCityId,
            openCityView,
        }: {
            nextCityId: string,
            openCityView: typeof openCityView,
        },
    ) => {

        const onNavigateToNextCityClick = () => {

            openCityView(
                {
                    cityId: nextCityId,
                },
            );

        };

        return (
            <button
                className={classNames(
                    `metal-bg`,
                    `text-gray-100`,
                    `font-bold`,
                    `py-2`,
                    `px-4`,
                    `rounded-tl`,
                    `inline-flex`,
                    `items-center`,
                    `cursor-pointer`,
                    `focus:outline-none`,
                    `bg-gray-400`,
                    `hover:bg-gray-300`,
                )}
                onClick={onNavigateToNextCityClick}
            >
                <i className="icofont icofont-arrow-right"/>
            </button>
        );

    };

    const navigateToPreviousCityButton = (
        {
            openCityView,
            previousCityId,
        }: {
            previousCityId: string,
            openCityView: typeof openCityView,
        },
    ) => {

        const onNavigateToPreviousCityClick = () => {

            openCityView(
                {
                    cityId: previousCityId,
                },
            );

        };

        return (
            <button
                className={classNames(
                    `metal-bg`,
                    `text-gray-100`,
                    `font-bold`,
                    `py-2`,
                    `px-4`,
                    `rounded-tl`,
                    `inline-flex`,
                    `items-center`,
                    `focus:outline-none`,
                    `cursor-pointer`,
                    `bg-gray-400`,
                    `hover:bg-gray-300`,
                )}
                onClick={onNavigateToPreviousCityClick}
            >
                <i className="icofont icofont-arrow-left"/>
            </button>
        );

    };

    return (
        <div data-testid={testIds.COMPONENT_CITY_VIEW.HEADER} className={className}>
            {previousCityId != null
            && navigateToPreviousCityButton(
                {
                    openCityView,
                    previousCityId,
                },
            )}
            <div className="flex flex-row items-center justify-center">
                {cityNameInput}
            </div>
            {nextCityId != null
            && navigateToNextCityButton(
                {
                    nextCityId,
                    openCityView,
                },
            )}
        </div>
    );

};
