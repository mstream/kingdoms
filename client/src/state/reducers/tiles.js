/**
 * @flow
 */
import type {Reducer} from 'redux';
import type {Action} from '../../types';
import type {ClientStateTile} from '../types';
import {tileSize} from './root';

const initialState: $ReadOnlyArray<ClientStateTile> = [];

export const tilesReducer: Reducer<$ReadOnlyArray<ClientStateTile>, Action> = (state = initialState, action) => {
    switch (action.type) {
        case 'SERVER_STATE_UPDATED': {
            const newTiles = [];

            const halfWidth = Math.floor(action.payload.worldSizeInTiles.x / 2);
            const halfHeight = Math.floor(action.payload.worldSizeInTiles.y / 2);

            for (let y = -halfHeight; y <= halfHeight; y++) {
                for (let x = -halfWidth; x <= halfWidth; x++) {
                    newTiles.push({
                        index: {x, y},
                        geometry: {
                            location: {x: x * tileSize.x, y: y * tileSize.y},
                            size: tileSize
                        },
                        type: 'PLAINS'
                    });
                }
            }

            return newTiles;
        }
        default: {
            return state;
        }
    }
};
