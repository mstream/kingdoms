// @flow

import React from 'react';
import type { Props } from './props';
import classNames from 'classnames';
import { numberToQuantityString } from '../../../../common/src/util';

export const testId = 'change-info';

export const Component = ({ changeInfo }: Props) => {
    const changeComponents = Object
        .keys(changeInfo)
        .sort((changeType1, changeType2) => {
            return changeInfo[changeType1] - changeInfo[changeType2];
        }).map(changeType => {
            const partialRate = changeInfo[changeType];
            const className = classNames({
                'text-red-500': partialRate < 0,
                'text-gray-900': partialRate === 0,
                'text-green-500': partialRate > 0,
            });
            return (
                <p key={changeType}
                   className="text-xs text-center font-medium text-gray-900">{changeType}:
                    <i className={className}>{numberToQuantityString({ value: partialRate })}/h</i>
                </p>
            );
        });
    return (
        <div data-testid={testId}
             className="flex flex-col m-1 rounded-sm bg-gray-100 shadow-2xs">{changeComponents}</div>
    );
};
