// @flow

import React from 'react';
import type {
    Props,
} from './props';
import {
    createGeometryStyle,
} from '../../../utils';
import {
    ImageComponent,
} from '../../image';
import {
    surfaceImages,
} from '../../../assets/images/terrain';
import {
    testIds,
} from '../../../../../common/src/ui';

export const Component = (
    {
        tile,
    }: Props,
) => {

    const style = {
        ...createGeometryStyle(
            {
                geometry: tile.geometry,
            },
        ),
    };

    return (
        <div data-testid={testIds.COMPONENT_WORLD_MAP.TERRAIN_TILE} className="absolute" style={style}>
            <ImageComponent
                image={surfaceImages[ tile.textureIndex ]}
                ratio="100%"
            />
        </div>
    );

};
