/**
 * @flow
 */

import React from 'react';
import './style.css';
import type {Geometry, Tile} from '../../types';
import {createGeometryStyle} from '../../util';
import plains from '../../assets/images/terrain/plains.bmp'

const Component = ({geometry, tile}: { geometry: Geometry, tile: Tile }) => {

    const style = {
        ...createGeometryStyle({debugColor: 'rgba(0,0,255,0.5)', geometry}),
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
