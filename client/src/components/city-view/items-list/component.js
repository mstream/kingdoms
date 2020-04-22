// @flow

import {
    testIds,
} from '../../../../../common/src/ui';
import React from 'react';
import classNames from 'classnames';
import type {
    Props,
} from './props';


export const Component = (
    {
        children,
    }: Props,
) => {

    return (
        <div
            data-testid={testIds.cityView.itemsList}
            className={classNames(
                `flex`,
                `flex-row`,
                `flex-wrap`,
                `flex-none`,
                `items-stretch`,
                `content-center`,
                `justify-center`,
                `w-full`,
                `shadow-inner`,
            )}
        >
            {children}
        </div>
    );

};
