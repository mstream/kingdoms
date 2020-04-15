// @flow

import {
    surfaceImages,
} from '../../../../../../assets/images/terrain';
import {
    tileVectorToPixelVector,
} from '../../../../../../utils';
import tumult from 'tumult';
import type {
    ClientStateActionReducer,
} from '../../../../../types';
import type {
    ClientStateTiles,
} from '../types';
import type {
    ClientUpdateStateAction,
} from '../../../common-state/actions/types';
import type {
    Vector,
} from '../../../../../../../../common/src/vector';

type Reducer = ClientStateActionReducer< ClientStateTiles,
    ClientUpdateStateAction, >;

const perlin2 = new tumult.Simplex2(
    `qwerty`,
);

const calculateTextureIndex = (
    {
        index,
    }: { index: Vector },
): number => {

    return Math.round(
        Math.abs(
            perlin2.gen(
                Math.abs(
                    index.x,
                ),
                Math.abs(
                    index.y,
                ),
            ),
        )
        * ( surfaceImages.length - 1 ),
    );

};

export const updateStateTilesReducer: Reducer = (
    {
        action,
        localState,
    },
) => {

    const newCityTiles = Object.keys(
        action.payload.commonState.cities,
    )
        .reduce(
            (
                newCityTiles, cityId,
            ) => {

                const city = action.payload.commonState.cities[ cityId ];

                const geometry = {
                    location: tileVectorToPixelVector(
                        {
                            tileVector: city.location,
                        },
                    ),
                    size: tileVectorToPixelVector(
                        {
                            tileVector: {
                                x: 1,
                                y: 1,
                            },
                        },
                    ),
                };

                return {
                    ...newCityTiles,
                    [ cityId ]: {
                        geometry,
                        index       : city.location,
                        textureIndex: 0,
                        type        : `CITY`,
                    },
                };

            },
            Object.freeze(
                {
                },
            ),
        );

    const newTerrainTiles = [];

    for (
        let y = -action.payload.commonState.world.size.y;
        y <= action.payload.commonState.world.size.y;
        y += 1
    ) {

        for (
            let x = -action.payload.commonState.world.size.x;
            x <= action.payload.commonState.world.size.x;
            x += 1
        ) {

            const index = {
                x,
                y,
            };

            newTerrainTiles.push(
                {
                    geometry: {
                        location: tileVectorToPixelVector(
                            {
                                tileVector: index,
                            },
                        ),
                        size: tileVectorToPixelVector(
                            {
                                tileVector: {
                                    x: 1,
                                    y: 1,
                                },
                            },
                        ),
                    },
                    index,
                    textureIndex: calculateTextureIndex(
                        {
                            index: {
                                x: index.x + action.payload.commonState.world.size.x,
                                y: index.y + action.payload.commonState.world.size.y,
                            },
                        },
                    ),
                    type: `PLAINS`,
                },
            );

        }

    }

    return {
        ...localState,
        city   : newCityTiles,
        terrain: newTerrainTiles,
    };

};
