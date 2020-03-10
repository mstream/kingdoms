// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import type { ClientState } from '../../state/state';
import { emptyClientState, emptyClientStateCityTile } from '../../state/state';
import { AppComponent } from '.';
import { emptyCityState, emptyCommonState } from '../../../../common/src/state';

const mockStore = configureStore([]);

describe('AppComponent', () => {
    test('displays loader while the server state is being fetched', async () => {
        const state: ClientState = {
            ...emptyClientState,
        };

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <AppComponent/>
            </Provider>,
        );

        await expect(queryByText('Loading...')).toBeInTheDocument();
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
                    '1': {
                        ...emptyCityState,
                        ownerId: 'player2',
                    },
                },
            },
            tiles: {
                ...emptyClientState.tiles,
                city: {
                    ...emptyClientState.tiles.city,
                    '1': {
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

        await expect(queryByText('Start game')).toBeInTheDocument();
        await expect(queryByText('City name')).toBeInTheDocument();
        await expect(queryByText('Start')).toBeInTheDocument();
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
                    '1': {
                        ...emptyCityState,
                        ownerId: 'player2',
                    },
                    '2': {
                        ...emptyCityState,
                        ownerId: 'player1',
                    },
                },
            },
            tiles: {
                ...emptyClientState.tiles,
                city: {
                    ...emptyClientState.tiles.city,
                    '1': {
                        ...emptyClientStateCityTile,
                    },
                    '2': {
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