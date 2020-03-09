// @flow

import React from 'react';
import type { Props } from './props';

export const testId = 'image';

export const Component = ({ children, image, ratio }: Props) => {

    const style = {
        paddingBottom: ratio,
    };
    return (
        <div
            data-testid={testId}
            className="relative"
            style={style}
        >
            <img
                className="absolute h-full w-full object-cover"
                src={image}
                alt="image"
            />
            {children}
        </div>
    );
};
