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
        playerName, signOut,
    }: Props,
) => {

    if ( playerName == null ) {

        return null;

    }

    return (
        <div
            data-testid={testIds.COMPONENT_MENU.PARENT}
            className={classNames(
                `wood2-bg`,
                `relative`,
                `flex`,
                `flex-row`,
                `items-end`,
                `justify-start`,
                `h-20`,
                `w-full`,
                `z-10`,
                `shadow-lg`,
                `bg-gray-500`,
                `text-gray-100`,
            )}
        >
            <div className="group ml-1 cursor-pointer">
                <div data-testid={testIds.COMPONENT_MENU.DROPDOWN_BUTTON}
                    className="h-full p-2"
                >
                    <i className="icofont icofont-ui-user mr-1"/>
                    {playerName}
                    <i className="icofont icofont-caret-down"/>
                </div>
                <div
                    className="absolute invisible group-hover:visible text-gray-100">
                    <div
                        data-testid={testIds.COMPONENT_MENU.SIGN_OUT_BUTTON}
                        className="wood2-bg p-2 cursor-pointer bg-gray-600 hover:bg-gray-400"
                        onClick={() => {

                            signOut();

                        }}
                    >
                        <i className="icofont icofont-ui-power"/>
                        Sign Out
                    </div>
                </div>
            </div>
        </div>
    );

};
