// @flow

import {
    testIds,
} from '../../../../../common/src/ui';
import React from 'react';
import type {
    Props,
} from './props';

export const Component = (
    {
        isVisible,
    }: Props,
) => {

    if ( !isVisible ) {

        return null;

    }

    return (
        <div
            data-testid={testIds.cityView.overviewPanel}
            className="flex flex-row p-1 text-lg text-gray-100"
            role="tabpanel"
        >
            <div className="flex flex-col p-1 mx-2">
                <p className="text-md">Buildings</p>
                <p>info</p>
                <p>info</p>
            </div>
            <div className="flex flex-col p-1 mx-2">
                <p className="text-md">Orders</p>
                <p>info</p>
                <p>info</p>
            </div>
            <div className="flex flex-col p-1 mx-2">
                <p className="text-md">Resources</p>
                <p>info</p>
                <p>info</p>
            </div>
            <div className="flex flex-col p-1 mx-2">
                <p className="text-md">Units</p>
                <p>info</p>
                <p>info</p>
            </div>
        </div>
    );

};
