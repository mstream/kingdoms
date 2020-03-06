// @flow

import React from 'react';
import type {Props} from './props';


export const Component = ({city}: Props) => {
    if (city.ownerId == null) {
        return null;
    }

    return (
        <div
            className="absolute left-1/2 transform -translate-y-full -translate-x-1/2 p-1 flex flex-row font-light text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-center rounded-lg text-gray-100 bg-gray-500-alpha-50">
            {city.ownerId}
        </div>
    );
};
