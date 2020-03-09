// @flow

import React from 'react';
import type { Props } from './props';

export const testId = 'city-items-list';

export const Component = ({ children }: Props) => {
    return (
        <div data-testid={testId}
            className="flex flex-row flex-wrap flex-none items-stretch content-center justify-center w-full p-1 shadow-inner"
        >
            {children}
        </div>
    );
};
