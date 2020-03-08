// @flow

import React from 'react';
import type { Props } from './props';


export const Component = ({ children }: Props) => {
    return (
        <div
            className="flex flex-row flex-wrap flex-none items-stretch content-center justify-center w-full p-1 shadow-inner"
        >
            {children}
        </div>
    );
};
