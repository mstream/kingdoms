// @flow

import {
    ImageComponent,
} from '../../image';

import {
    createGeometryStyle,
} from '../../../utils';
import {
    surfaceImages,
} from '../../../assets/images/terrain';
import {
    testIds,
} from '../../../../../common/src/ui';
import React from 'react';
import type {
    Props,
} from './props';

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
        <div
            data-testid={testIds.worldMap.terrainTile}
            className="absolute" style={style}
        >
            <ImageComponent
                image={
                    surfaceImages[ tile.textureIndex ]
                }
                ratio="100%"
            />
        </div>
    );

};
