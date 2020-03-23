// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { WorldMapComponent } from './index';
import { terrainTileComponentTestId } from './terrain-tile';
import { cityTileComponentTestId } from './city-tile';
import type { ClientState } from '../../state/modules/types';
import { emptyCommonState } from '../../../../common/src/state/modules/state';
import { emptyCityState } from '../../../../common/src/state/modules/cities/reducer/state';
import {
    emptyClientStateCityTile,
    emptyClientStateTerrainTile,
} from '../../state/modules/tiles/reducer/state';
import { emptyClientState } from '../../state/modules/state';

const mockStore = configureStore([]);

describe('WorldMapComponent', () => {
    test('is hidden when common state is not loaded', async () => {
        const state: ClientState = {
            ...emptyClientState,
            commonState: null,
        };

        const windowSize = { x: 100, y: 100 };

        const store = mockStore(state);

        const { queryAllByTestId } = render(
            <Provider store={store}>
                <WorldMapComponent windowSize={windowSize}/>
            </Provider>,
        );

        await expect(queryAllByTestId(cityTileComponentTestId).length).toEqual(0);
        await expect(queryAllByTestId(terrainTileComponentTestId).length).toEqual(0);

    });

    test('shows up when common state is loaded', async () => {
        const state: ClientState = {
            ...emptyClientState,
            camera: {
                ...emptyClientState.camera,
                geometry: {
                    ...emptyClientState.camera.geometry,
                    location: {
                        x: 0,
                        y: 0,
                    },
                    size: {
                        x: 1000,
                        y: 1000,
                    },
                },
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    ...emptyCommonState.cities,
                    'city1': {
                        ...emptyCityState,
                    },
                },
            },
            tiles: {
                ...emptyClientState.tiles,
                city: {
                    'city1': {
                        ...emptyClientStateCityTile,
                    },
                },
                terrain: [
                    {
                        ...emptyClientStateTerrainTile,
                    },
                ],
            },
        };

        const windowSize = { x: 100, y: 100 };

        const store = mockStore(state);

        const { queryAllByTestId } = render(
            <Provider store={store}>
                <WorldMapComponent windowSize={windowSize}/>
            </Provider>,
        );

        await expect(queryAllByTestId(cityTileComponentTestId).length).toBeGreaterThan(0);
        await expect(queryAllByTestId(terrainTileComponentTestId).length).toBeGreaterThan(0);
    });
});