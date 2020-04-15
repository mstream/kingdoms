// @flow

import {
    numberToQuantityString,
} from '../../../../common/src/utils';
import {
    testIds,
} from '../../../../common/src/ui';
import React from 'react';
import classNames from 'classnames';
import type {
    Props,
} from './props';


export const Component = (
    {
        changeInfo,
    }: Props,
) => {

    const changeRowComponents = Object.keys(
        changeInfo,
    )
        .filter(
            (
                changeType,
            ) => {

                return Math.abs(
                    changeInfo[ changeType ],
                ) >= 1;

            },
        )
        .sort(
            (
                changeType1, changeType2,
            ) => {

                return changeInfo[ changeType2 ] - changeInfo[ changeType1 ];

            },
        )
        .map(
            (
                changeType,
            ) => {

                const partialRate = changeInfo[ changeType ];
                const className = classNames(
                    {
                        'text-gray-900' : partialRate === 0,
                        'text-green-500': partialRate > 0,
                        'text-red-500'  : partialRate < 0,
                    },
                );
                return (
                    <tr
                        key={changeType}
                        className="text-sm text-right font-medium text-gray-900"
                    >
                        <td>{changeType}:</td>
                        <td className={className}>
                            {numberToQuantityString(
                                {
                                    value: partialRate,
                                },
                            )}/h
                        </td>
                    </tr>
                );

            },
        );
    return (
        <table
            data-testid={testIds.COMPONENT_CHANGE_INFO.PARENT}
            className="table-fixed border-separate shadow-inner"
        >
            <tbody>{changeRowComponents}</tbody>
        </table>
    );

};
