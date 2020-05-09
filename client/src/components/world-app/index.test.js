// @flow

import '@testing-library/jest-dom/extend-expect';
import {
    Provider,
} from 'react-redux';
import {
    WorldAppComponent,
} from '.';
import {
    emptyCityState,
} from '../../../../common/src/state/modules/_children/cities/reducer/state';
import {
    emptyClientState,
} from '../../pages/world/state/state';
import {
    emptyClientStateCityTile,
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
    `WorldAppComponent`,
    () => {

        test(
            `displays loader while the server state is being fetched`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                    commonState: null,
                };

                const store = mockStore(
                    state,
                );

                const {
                    queryByTestId,
                } = render(
                    <Provider store={store}>
                        <WorldAppComponent/>
                    </Provider>,
                );

                await expect(
                    queryByTestId(
                        testIds.loader.parent,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

        test(
            `displays new game window when the server state is loaded `
            + `and the player does not own any city`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                    commonState: {
                        ...emptyCommonState,
                        cities: {
                            city1: {
                                ...emptyCityState,
                                ownerId: `player2`,
                            },
                        },
                    },
                    player: {
                        ...emptyClientState.player,
                        name: `player1`,
                    },
                    tiles: {
                        ...emptyClientState.tiles,
                        city: {
                            ...emptyClientState.tiles.city,
                            city1: {
                                ...emptyClientStateCityTile,
                            },
                        },
                    },
                };

                const store = mockStore(
                    state,
                );

                const {
                    queryByTestId,
                } = render(
                    <Provider store={store}>
                        <WorldAppComponent/>
                    </Provider>,
                );

                await expect(
                    queryByTestId(
                        testIds.loader.parent,
                    ),
                ).not.toBeInTheDocument();

                await expect(
                    queryByTestId(
                        testIds.gameStart.parent,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

        test(
            `does not display new game window when the server state is loaded `
            + `and the player does own a city`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                    commonState: {
                        ...emptyCommonState,
                        cities: {
                            city1: {
                                ...emptyCityState,
                                ownerId: `player2`,
                            },
                            city2: {
                                ...emptyCityState,
                                ownerId: `player1`,
                            },
                        },
                    },
                    player: {
                        ...emptyClientState.player,
                        name: `player1`,
                    },
                    tiles: {
                        ...emptyClientState.tiles,
                        city: {
                            ...emptyClientState.tiles.city,
                            city1: {
                                ...emptyClientStateCityTile,
                            },
                            city2: {
                                ...emptyClientStateCityTile,
                            },
                        },
                    },
                };

                const store = mockStore(
                    state,
                );

                const {
                    queryByText,
                } = render(
                    <Provider store={store}>
                        <WorldAppComponent/>
                    </Provider>,
                );

                await expect(
                    queryByText(
                        `Start game`,
                    ),
                ).not.toBeInTheDocument();

                await expect(
                    queryByText(
                        `City name`,
                    ),
                ).not.toBeInTheDocument();

                await expect(
                    queryByText(
                        `Start`,
                    ),
                ).not.toBeInTheDocument();

            },
        );

    },
);
