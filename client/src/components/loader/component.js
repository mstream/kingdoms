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
        isCommonStateBeingLoaded,
    }: Props,
) => {

    if ( isCommonStateBeingLoaded === false ) {

        return null;

    }

    return (
        <div
            data-testid={testIds.loader.parent}
            className={
                classNames(
                    `absolute`,
                    `flex`,
                    `flex-row`,
                    `content-center`,
                    `justify-center`,
                    `h-screen w-screen`,
                )
            }
        >
            <div
                className={
                    classNames(
                        `flex`,
                        `flex-col`,
                        `content-center`,
                        `justify-center`,
                        `text-gray-100`,
                    )
                }>
                <div className="loader h-20 w-20 grid grid-cols-3">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
                <div className="text-xl">Loading...</div>
            </div>
        </div>
    );

};
