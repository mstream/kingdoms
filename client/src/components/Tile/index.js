/**
 * @flow
 */

import React from 'react';
import './style.css';
import type {Tile} from '../../types';
import {createGeometryStyle} from '../../util';
import plains from '../../assets/images/terrain/plains.bmp';

const Component = ({debugColor, tile}: { debugColor: string, tile: Tile }) => {

    const style = {
        ...createGeometryStyle({geometry: tile.geometry}),
        backgroundImage: `url(${plains})`,
        borderStyle: 'solid',
        borderColor: debugColor
    };

    return (
        <div className="Tile"
             style={style}>
            {`(${tile.index.x},${tile.index.y})`}
        </div>
    );
};

export const TileComponent = Component;
