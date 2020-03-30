// @flow

import React from 'react';
import type { Props } from './props';
import { signOut } from '../../util';

export const testId = 'menu';

export const Component = ({ playerName }: Props) => {
    if (playerName == null) {
        return null;
    }
    return (
        <div data-testid={testId}
             className="wood2-bg relative flex flex-row items-end justify-start h-20 w-full z-10 shadow-lg bg-gray-500 text-gray-100">
            <div className="group ml-1 cursor-pointer">
                <div className="h-full p-2">
                    <i className="icofont icofont-ui-user mr-1"/>
                    {playerName}
                    <i className="icofont icofont-caret-down"/>
                </div>
                <div
                    className="absolute invisible group-hover:visible text-gray-100">
                    <div
                        className="wood2-bg p-2 cursor-pointer bg-gray-600 hover:bg-gray-400"
                        onClick={
                            (event: MouseEvent<HTMLDivElement>) => {
                                signOut({ location: window.location });
                            }
                        }>
                        <i className="icofont icofont-ui-power"/>
                        Sign Out
                    </div>
                </div>
            </div>
        </div>
    );
};
