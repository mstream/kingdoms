// @flow

import React from 'react';
import type { Props } from './props';
import { createGeometryStyle } from '../../../util';
import { ImageComponent } from '../../image';
import { surfaceImages } from '../../../assets/images/terrain';

export const testId = 'terrain-tile';

export const Component = ({ tile }: Props) => {
    const style = {
        ...createGeometryStyle({ geometry: tile.geometry }),
    };

    return <div data-testid={testId}
                className="absolute"
                style={style}
    >
        <ImageComponent image={surfaceImages[tile.textureIndex]} ratio="100%"/>
    </div>;
};
