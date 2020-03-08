// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import type { ClientState } from '../../state/state';
import { emptyClientState } from '../../state/state';
import { AppComponent } from '.';

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
});