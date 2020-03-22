// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AppComponent } from '.';
import { loaderComponentTestId } from '../loader';
import { gameStartComponentTestId } from '../game-start';
import { emptyClientState } from '../../state/modules/types';
import type { ClientState } from '../../state/modules/types';
import { emptyCommonState } from '../../../../common/src/state/modules/state';
import { emptyCityState } from '../../../../common/src/state/modules/cities/reducer/state';
import { emptyClientStateCityTile } from '../../state/modules/tiles/reducer/state';

const mockStore = configureStore([]);

describe('AppComponent', () => {
    test('displays loader while the server state is being fetched', async () => {
        const state: ClientState = {
            ...emptyClientState,
            commonState: null,
        };

        const store = mockStore(state);

        const { queryByTestId } = render(
            <Provider store={store}>
                <AppComponent/>
            </Provider>,
        );

        await expect(queryByTestId(loaderComponentTestId)).toBeInTheDocument();
    });

    test('displays new game window when the server state is loaded and the player does not own any city', async () => {
        const state: ClientState = {
            ...emptyClientState,
            player: {
                ...emptyClientState.player,
                name: 'player1',
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    'city1': {
                        ...emptyCityState,
                        ownerId: 'player2',
                    },
                },
            },
            tiles: {
                ...emptyClientState.tiles,
                city: {
                    ...emptyClientState.tiles.city,
                    'city1': {
                        ...emptyClientStateCityTile,
                    },
                },
            },
        };

        const store = mockStore(state);

        const { queryByTestId } = render(
            <Provider store={store}>
                <AppComponent/>
            </Provider>,
        );

        await expect(queryByTestId(loaderComponentTestId)).not.toBeInTheDocument();
        await expect(queryByTestId(gameStartComponentTestId)).toBeInTheDocument();
    });

    test('does not display new game window when the server state is loaded and the player does own a city', async () => {
        const state: ClientState = {
            ...emptyClientState,
            player: {
                ...emptyClientState.player,
                name: 'player1',
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    'city1': {
                        ...emptyCityState,
                        ownerId: 'player2',
                    },
                    'city2': {
                        ...emptyCityState,
                        ownerId: 'player1',
                    },
                },
            },
            tiles: {
                ...emptyClientState.tiles,
                city: {
                    ...emptyClientState.tiles.city,
                    'city1': {
                        ...emptyClientStateCityTile,
                    },
                    'city2': {
                        ...emptyClientStateCityTile,
                    },
                },
            },
        };

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <AppComponent/>
            </Provider>,
        );

        await expect(queryByText('Start game')).not.toBeInTheDocument();
        await expect(queryByText('City name')).not.toBeInTheDocument();
        await expect(queryByText('Start')).not.toBeInTheDocument();
    });
});