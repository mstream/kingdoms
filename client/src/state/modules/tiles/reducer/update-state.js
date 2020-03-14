// @flow


import type { ClientStateTiles } from './types';
import { tileVectorToPixelVector } from '../../../../util';
import tumult from 'tumult';
import type { Vector } from '../../../../../../common/src/vector';
import { surfaceImages } from '../../../../assets/images/terrain';
import type { ClientState } from '../../root';
import type { ClientUpdateStateAction } from '../../common-state/actions';

const perlin2 = new tumult.Simplex2('qwerty');

const calculateTextureIndex = ({ index }: { index: Vector }): number => {
    return Math.round(Math.abs(perlin2.gen(Math.abs(index.x), Math.abs(index.y))) * (surfaceImages.length - 1));
};

export const updateStateTilesReducer = (
    {
        action,
        globalState,
        localState,
    }: {
        action: ClientUpdateStateAction,
        globalState: ClientState,
        localState: ClientStateTiles,
    },
): ClientStateTiles => {
    const newCityTiles = Object.keys(action.payload.commonState.cities).reduce(
        (newCityTiles, cityId) => {
            const city = action.payload.commonState.cities[cityId];

            const geometry = {
                location: tileVectorToPixelVector({ tileVector: city.location }),
                size: tileVectorToPixelVector({
                    tileVector: {
                        x: 1,
                        y: 1,
                    },
                }),
            };

            return {
                ...newCityTiles,
                [cityId]: {
                    geometry,
                    index: city.location,
                    textureIndex: 0,
                    type: 'CITY',
                },
            };
        },
        Object.freeze({}),
    );

    const newTerrainTiles = [];

    for (let y = -action.payload.commonState.world.size.y; y <= action.payload.commonState.world.size.y; y++) {
        for (let x = -action.payload.commonState.world.size.x; x <= action.payload.commonState.world.size.x; x++) {
            const index = { x, y };
            newTerrainTiles.push({
                index,
                geometry: {
                    location: tileVectorToPixelVector({ tileVector: index }),
                    size: tileVectorToPixelVector({
                        tileVector: {
                            x: 1,
                            y: 1,
                        },
                    }),
                },
                textureIndex: calculateTextureIndex({
                    index: {
                        x: index.x + action.payload.commonState.world.size.x,
                        y: index.y + action.payload.commonState.world.size.y,
                    },
                }),
                type: 'PLAINS',
            });
        }
    }

    return {
        ...localState,
        city: newCityTiles,
        terrain: newTerrainTiles,
    };
};
