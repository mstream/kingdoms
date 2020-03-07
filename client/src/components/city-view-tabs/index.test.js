// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { emptyClientState, TAB_OVERVIEW } from '../../state/state';
import { CityViewTabsComponent } from '.';
import type { ClientState } from '../../state/state';

const mockStore = configureStore([]);

describe('CityViewTabsComponent', () => {
    test('bla bla bla', async () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    tab: TAB_OVERVIEW,
                },
            },
        };

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <CityViewTabsComponent/>
            </Provider>,
        );

        await expect(queryByText(/Overview/)).toBeInTheDocument();
        await expect(queryByText(/Resources/)).toBeInTheDocument();
        await expect(queryByText(/Units/)).toBeInTheDocument();
        await expect(queryByText(/Buildings/)).toBeInTheDocument();
    });
});