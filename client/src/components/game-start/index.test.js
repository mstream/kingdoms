// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { GameStartComponent, gameStartComponentTestId } from './index';
import { emptyClientState } from '../../state/modules/types';
import type { ClientState } from '../../state/modules/types';
import { emptyCommonState } from '../../../../common/src/state/modules/state';
import { emptyCityState } from '../../../../common/src/state/modules/cities/reducer/state';

const mockStore = configureStore([]);

describe('GameStartComponent', () => {
    test('does not show up when game is not starting', async () => {
        const state: ClientState = {
            ...emptyClientState,
            commonState: {
                ...emptyCommonState,
                cities: {
                    'city1': {
                        ...emptyCityState,
                        ownerId: 'player1',
                    },
                },
            },
            player: {
                name: 'player1',
            },
        };

        const store = mockStore(state);

        const { queryByTestId } = render(
            <Provider store={store}>
                <GameStartComponent/>
            </Provider>,
        );

        await expect(queryByTestId(gameStartComponentTestId)).not.toBeInTheDocument();
    });

    test('does show up when game is starting', async () => {
        const state: ClientState = {
            ...emptyClientState,
            commonState: {
                ...emptyCommonState,
                cities: {
                    'city1': {
                        ...emptyCityState,
                        ownerId: 'player2',
                    },
                },
            },
            player: {
                name: 'player1',
            },
        };

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <GameStartComponent/>
            </Provider>,
        );

        await expect(queryByText('Start')).toBeInTheDocument();
        await expect(queryByText('City name')).toBeInTheDocument();
    });
});