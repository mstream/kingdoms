// @flow

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
        errors,
    }: Props,
) => {

    if ( errors.length === 0 ) {

        return null;

    }

    const errorsComponents = errors.map(
        (
            error: string, index: number,
        ) => {

            return <li key={index}>{error}</li>;

        },
    );

    return (
        <div
            data-testid={testIds.COMPONENT_ERRORS.PARENT}
            className={classNames(
                `modal`,
                `absolute`,
                `top-0`,
                `left-0`,
                `w-screen`,
                `h-screen`,
                `flex`,
                `items-center`,
                `justify-center`,
                `text-gray-100`,
            )}
        >
            <div
                className="modal-overlay absolute w-full h-full bg-gray-900 opacity-75 top-0 left-0"/>
            <div
                className={classNames(
                    `metal-black-bg`,
                    `absolute`,
                    `w-9/12`,
                    `min-h-3/4`,
                    `rounded-sm`,
                    `shadow-lg`,
                    `flex`,
                    `flex-col`,
                    `items-center`,
                    `justify-center`,
                    `overflow-hidden`,
                    `bg-gray-800`,
                )}>
                <p>Error</p>
                <ul className="w-3/4 break-words">{errorsComponents}</ul>
            </div>
        </div>
    );

};
