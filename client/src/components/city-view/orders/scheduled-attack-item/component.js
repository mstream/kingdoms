// @flow

import {
    calculateTimeDeltaInSeconds,
    minutesToDurationString,
    translateTime,
} from '../../../../../../common/src/time';
import {
    testIds,
} from '../../../../../../common/src/ui';
import React from 'react';
import classNames from 'classnames';
import type {
    Props,
} from './props';

export const Component = (
    {
        cities,
        cityId,
        isActive,
        item,
        time,
    }: Props,
) => {

    if ( cities == null || cityId == null || time == null ) {

        return null;

    }

    const plannedAttackTime = translateTime(
        {
            deltaInMinutes: item.minimumDelay,
            time          : item.creationTime,
        },
    );

    const timeDeltaInSeconds = calculateTimeDeltaInSeconds(
        {
            fromTime: time,
            toTime  : plannedAttackTime,
        },
    );

    const isDelayed = timeDeltaInSeconds < 0;

    const durationString = minutesToDurationString(
        {
            durationInMinutes: Math.abs(
                timeDeltaInSeconds / 60,
            ),
        },
    );

    const attackedCityName = cities[ item.targetCityId ].name;
    const header = `Attack ${ attackedCityName }`;

    const description = isDelayed
        ? `delayed by`
        : `in`;

    const subheader = `${ description } ${ durationString }`;

    const itemClassName = classNames(
        `flex flex-col m-1 leading-tight cursor-pointer`,
        {
            'bg-green-500': isActive,
        },
    );

    const subheaderClassName = classNames(
        `text-xs`,
        {
            'text-green-300': !isDelayed,
            'text-red-300'  : isDelayed,
        },
    );

    return (
        <div
            data-testid={testIds.cityView.scheduledAttackItem}
            className={itemClassName}
        >
            <div className="text-sm font-medium">{header}</div>
            <div className={subheaderClassName}>{subheader}</div>
        </div>
    );

};
