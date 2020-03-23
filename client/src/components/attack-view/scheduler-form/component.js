// @flow

import React from 'react';
import type { Props } from './props';
import { numberToDurationString } from '../../../../../common/src/util';
import classNames from 'classnames';

export const testId = 'attack-view-scheduler-form';

export const Component = (
    {
        isVisible,
        minimumDelay,
        updateAttackViewMinimumDelay,
    }: Props,
) => {
    if (!isVisible) {
        return null;
    }

    const onChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
        updateAttackViewMinimumDelay({ minimumDelay: parseInt(event.target.value) });
    };

    const durationClassName = classNames({
        'visible': minimumDelay > 0,
        'invisible': minimumDelay === 0,
    });

    return (
        <div
            data-testid={testId}
            className="flex flex-col justify-start text-xl">
            <div className="mb-1">
                When:
            </div>
            <div className="shadow-inner bg-gray-900-alpha-50">
                <div>{minimumDelay === 0 ? 'As soon as possible' : 'Not earlier than in'}</div>
                <div>
                    <input
                        className="w-full cursor-pointer"
                        type="range"
                        min="0"
                        max="600"
                        step="10"
                        value={minimumDelay}
                        onChange={onChange}
                    />
                    <div className={durationClassName}>
                        {numberToDurationString({ value: minimumDelay })}
                    </div>
                </div>

            </div>
        </div>
    );
};
