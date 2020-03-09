// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import type { ClientState } from '../../state/state';
import { emptyClientState } from '../../state/state';
import { MenuComponent } from './index';

const mockStore = configureStore([]);

describe('MenuComponent', () => {
    test('renders player name when they are signed in', async () => {
        const state: ClientState = {
            ...emptyClientState,
            player: {
                name: 'player1',
            },
        };

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <MenuComponent/>
            </Provider>,
        );

        await expect(queryByText('player1')).toBeInTheDocument();
    });
});