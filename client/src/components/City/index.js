/**
 * @flow
 */

import React from 'react';
import './style.css';
import type {City} from '../../types';
import {createGeometryStyle} from '../../util';

const Component = ({city}: { city: City }) => {

    const style = {
        ...createGeometryStyle({geometry: city.geometry}),
        background: 'rgba(0,255,0,1)',
    };

    return (
        <div className="City"
             style={style}>
            {city.name}
        </div>
    );
};

export const CityComponent = Component;
