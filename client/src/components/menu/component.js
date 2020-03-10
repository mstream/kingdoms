// @flow

import React from 'react';
import type { Props } from './props';
import { signOut } from '../../state/store';

export const testId = 'menu';

export const Component = ({ player }: Props) => {
    if (player == null) {
        return null;
    }
    return (
        <div data-testid={testId}
             className="wood2-bg relative flex flex-row items-end justify-start h-20 w-full z-10 shadow-lg bg-gray-500 text-gray-100">
            <div className="group ml-1 cursor-pointer">
                <div className="h-full p-2">
                    <i className="icofont icofont-ui-user mr-1"/>
                    {player.name}
                    <i className="icofont icofont-caret-down"/>
                </div>
                <div
                    className="absolute invisible group-hover:visible text-gray-100">
                    <div
                        className="wood2-bg p-2 cursor-pointer bg-gray-600 hover:bg-gray-400"
                        onClick={
                            (event) => {
                                signOut();
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
