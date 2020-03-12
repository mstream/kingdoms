// @flow

import React from 'react';
import type { Props } from './props';
import classNames from 'classnames';
import { numberToQuantityString } from '../../../../common/src/util';

export const testId = 'change-info';

export const Component = ({ changeInfo }: Props) => {
    const changeRowComponents = Object
        .keys(changeInfo)
        .filter(changeType => Math.abs(changeInfo[changeType]) >= 1)
        .sort((changeType1, changeType2) => {
            return changeInfo[changeType2] - changeInfo[changeType1];
        }).map(changeType => {
            const partialRate = changeInfo[changeType];
            const className = classNames({
                'text-red-500': partialRate < 0,
                'text-gray-900': partialRate === 0,
                'text-green-500': partialRate > 0,
            });
            return (
                <tr key={changeType}
                    className="text-sm text-right font-medium text-gray-900">
                    <td>{changeType}:</td>
                    <td className={className}>{numberToQuantityString({ value: partialRate })}/h</td>
                </tr>
            );
        });
    return (
        <table data-testid={testId}
               className="table-fixed border-separate shadow-inner">
            <tbody>
                {changeRowComponents}
            </tbody>
        </table>
    );
};
