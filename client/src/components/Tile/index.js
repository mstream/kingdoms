/**
 * @flow
 */

import React from 'react';
import './style.css';
import type {Geometry, Tile} from '../../types';
import {createGeometryStyle} from '../../util';
import plains from '../../assets/images/terrain/plains.bmp';

const Component = ({debugColor, geometry, tile}: { debugColor: string, geometry: Geometry, tile: Tile }) => {

    const style = {
        ...createGeometryStyle({debugColor, geometry}),
        backgroundImage: `url(${plains})`,
    };

    return (
        <div className="Tile"
             style={style}>
            {`(${tile.index.x},${tile.index.y})`}
        </div>
    );
};

export const TileComponent = Component;
