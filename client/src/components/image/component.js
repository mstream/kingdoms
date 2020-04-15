// @flow

import {
    testIds,
} from '../../../../common/src/ui';
import React from 'react';
import type {
    Props,
} from './props';

export const Component = (
    {
        children, className, image, ratio,
    }: Props,
) => {

    const style = {
        paddingBottom: ratio,
    };

    const localClassname = `absolute h-full w-full object-cover`;
    const mergedClassname
        = className == null
            ? localClassname
            : `${ localClassname } ${ className }`;

    return (
        <div data-testid={testIds.COMPONENT_IMAGE.PARENT} className="relative" style={style}>
            <img className={mergedClassname} src={image} alt="image"/>
            {children}
        </div>
    );

};
