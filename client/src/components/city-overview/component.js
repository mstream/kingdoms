// @flow

import React from 'react';
import type { Props } from './props';

export const testId = 'city-overview';

export const Component = (
    {
        city,
        isVisible,
    }: Props) => {

    if (!isVisible) {
        return null;
    }

    return (
        <div
            data-testid={testId}
            className="flex flex-row p-1 text-lg text-gray-100"
            role="tabpanel"
        >
            <div className="flex flex-col p-1 mx-2">
                <p>group1info1</p>
                <p>group1info2</p>
                <p>group1info3</p>
            </div>
            <div className="flex flex-col p-1 mx-2">
                <p>group2info1</p>
                <p>group2info2</p>
                <p>group2info3</p>
            </div>
        </div>
    );
};
