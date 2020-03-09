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
             className="wallpaper-bg relative flex flex-row items-stretch justify-start h-20 w-full z-10 shadow-lg bg-gray-500 text-gray-100">
            <div className="group cursor-pointer">
                <div className="h-full">
                    <i className="icofont icofont-ui-user"/>
                    {player.name}
                    <i className="icofont icofont-caret-down"/>
                </div>
                <div
                    className="wallpaper2-bg absolute invisible group-hover:visible bg-gray-500 text-gray-100">
                    <div className="cursor-pointer" onClick={
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
