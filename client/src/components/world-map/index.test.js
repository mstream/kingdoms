// @flow

import '@testing-library/jest-dom/extend-expect';
import {
    Provider,
} from 'react-redux';
import {
    WorldMapComponent,
} from './index';
import {
    emptyCityState,
} from '../../../../common/src/state/modules/_children/cities/reducer/state';
import {
    emptyClientState,
} from '../../pages/world/state/state';
import {
    emptyClientStateCityTile,
    emptyClientStateTerrainTile,
} from '../../pages/world/state/modules/_children/tiles/reducer/state';
import {
    emptyCommonState,
} from '../../../../common/src/state/modules/state';
import {
    render,
} from '@testing-library/react';
import {
    testIds,
} from '../../../../common/src/ui';
import React from 'react';
import configureStore from 'redux-mock-store';
import type {
    ClientState,
} from '../../pages/world/state/types';

const mockStore = configureStore(
    [],
);

describe(
    `WorldMapComponent`,
    () => {

        test(
            `is hidden when common state is not loaded`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                    commonState: null,
                };

                const windowSize = {
                    x: 100,
                    y: 100,
                };

                const store = mockStore(
                    state,
                );

                const {
                    queryAllByTestId,
                } = render(
                    <Provider store={store}>
                        <WorldMapComponent windowSize={windowSize}/>
                    </Provider>,
                );

                await expect(
                    queryAllByTestId(
                        testIds.worldMap.cityTile,
                    ),
                )
                    .toHaveLength(
                        0,
                    );

                await expect(
                    queryAllByTestId(
                        testIds.worldMap.terrainTile,
                    ),
                )
                    .toHaveLength(
                        0,
                    );

            },
        );

        test(
            `shows up when common state is loaded`,
            async () => {

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
                            city1: {
                                ...emptyCityState,
                            },
                        },
                    },
                    tiles: {
                        ...emptyClientState.tiles,
                        city: {
                            city1: {
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

                const windowSize = {
                    x: 100,
                    y: 100,
                };

                const store = mockStore(
                    state,
                );

                const {
                    queryAllByTestId,
                } = render(
                    <Provider store={store}>
                        <WorldMapComponent windowSize={windowSize}/>
                    </Provider>,
                );

                await expect(
                    queryAllByTestId(
                        testIds.worldMap.cityTile,
                    ).length,
                )
                    .toBeGreaterThan(
                        0,
                    );

                await expect(
                    queryAllByTestId(
                        testIds.worldMap.terrainTile,
                    ).length,
                )
                    .toBeGreaterThan(
                        0,
                    );

            },
        );

    },
);
