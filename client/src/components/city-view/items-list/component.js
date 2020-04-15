// @flow

import React from 'react';
import type {
    Props,
} from './props';
import {
    testIds,
} from '../../../../../common/src/ui';
import classNames from 'classnames';


export const Component = (
    {
        children,
    }: Props,
) => {

    return (
        <div
            data-testid={testIds.COMPONENT_CITY_VIEW.ITEMS_LIST}
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
