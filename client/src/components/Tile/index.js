/**
 * @flow
 */

import React from 'react';
import './style.css';
import plains from '../../assets/images/terrain/plains.png';
import { createGeometryStyle } from '../../util';
import type { ClientStateTile } from '../../state/reducers/tiles';

const Component = ({ tile }: { tile: ClientStateTile }) => {
    const style = {
        ...createGeometryStyle({ geometry: tile.geometry }),
        backgroundImage: `url(${plains})`,
        borderStyle: 'solid',
        borderColor: 'rgba(0,0,255,1.0)',
    };

    return <div className="Tile" style={style} />;
};

export const TileComponent = Component;
