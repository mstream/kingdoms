// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { emptyClientState } from '../../state/state';
import { LoaderComponent } from '.';
import type { ClientState } from '../../state/state';
import { emptyCommonState } from '../../../../common/src/state';

const mockStore = configureStore([]);

describe('LoaderComponent', () => {
    test('is hidden when server state is loaded', async () => {
        const state: ClientState = {
            ...emptyClientState,
            commonState: {
                ...emptyCommonState,
            },
        };

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <LoaderComponent/>
            </Provider>,
        );

        await expect(queryByText('Loading...')).not.toBeInTheDocument();
    });

    test('shows up while loading the server state', async () => {
        const state: ClientState = {
            ...emptyClientState,
            commonState: null,
        };

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <LoaderComponent/>
            </Provider>,
        );

        await expect(queryByText('Loading...')).toBeInTheDocument();
    });
});