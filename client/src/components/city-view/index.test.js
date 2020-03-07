// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import type { ClientState } from '../../state/state';
import {
    emptyClientState,
    TAB_BUILDINGS,
    TAB_OVERVIEW,
    TAB_RESOURCES,
    TAB_UNITS,
} from '../../state/state';
import { CityViewComponent } from '.';
import { emptyCityState, emptyServerState } from '../../../../common/src/state';

const mockStore = configureStore([]);

describe('CityViewComponent', () => {
    test('displays city overview when the overview tab is active', async () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: '1',
                    tab: TAB_OVERVIEW,
                },
            },
            serverState: {
                ...emptyServerState,
                cities: {
                    '1': {
                        ...emptyCityState,
                    },
                },
            },
        };

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <CityViewComponent/>
            </Provider>,
        );

        await expect(queryByText(/Overview/)).toBeInTheDocument();
        await expect(queryByText(/Resources/)).toBeInTheDocument();
        await expect(queryByText(/Units/)).toBeInTheDocument();
        await expect(queryByText(/Buildings/)).toBeInTheDocument();

        await expect(queryByText(/Peasants/)).not.toBeInTheDocument();
        await expect(queryByText(/Pasture/)).not.toBeInTheDocument();
        await expect(queryByText(/Food/)).not.toBeInTheDocument();
    });

    test('displays units when the units tab is active', async () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: '1',
                    tab: TAB_UNITS,
                },
            },
            serverState: {
                ...emptyServerState,
                cities: {
                    '1': {
                        ...emptyCityState,
                    },
                },
            },
        };

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <CityViewComponent/>
            </Provider>,
        );

        await expect(queryByText(/Overview/)).toBeInTheDocument();
        await expect(queryByText(/Resources/)).toBeInTheDocument();
        await expect(queryByText(/Units/)).toBeInTheDocument();
        await expect(queryByText(/Buildings/)).toBeInTheDocument();

        await expect(queryByText(/Peasants/)).toBeInTheDocument();
        await expect(queryByText(/Pasture/)).not.toBeInTheDocument();
        await expect(queryByText(/Food/)).not.toBeInTheDocument();
    });

    test('displays buildings when the buildings tab is active', async () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: '1',
                    tab: TAB_BUILDINGS,
                },
            },
            serverState: {
                ...emptyServerState,
                cities: {
                    '1': {
                        ...emptyCityState,
                    },
                },
            },
        };

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <CityViewComponent/>
            </Provider>,
        );

        await expect(queryByText(/Overview/)).toBeInTheDocument();
        await expect(queryByText(/Resources/)).toBeInTheDocument();
        await expect(queryByText(/Units/)).toBeInTheDocument();
        await expect(queryByText(/Buildings/)).toBeInTheDocument();

        await expect(queryByText(/Peasants/)).not.toBeInTheDocument();
        await expect(queryByText(/Pasture/)).toBeInTheDocument();
        await expect(queryByText(/Food/)).not.toBeInTheDocument();
    });

    test('displays resources when the resources tab is active', async () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: '1',
                    tab: TAB_RESOURCES,
                },
            },
            serverState: {
                ...emptyServerState,
                cities: {
                    '1': {
                        ...emptyCityState,
                    },
                },
            },
        };

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <CityViewComponent/>
            </Provider>,
        );

        await expect(queryByText(/Overview/)).toBeInTheDocument();
        await expect(queryByText(/Resources/)).toBeInTheDocument();
        await expect(queryByText(/Units/)).toBeInTheDocument();
        await expect(queryByText(/Buildings/)).toBeInTheDocument();

        await expect(queryByText(/Peasants/)).not.toBeInTheDocument();
        await expect(queryByText(/Pasture/)).not.toBeInTheDocument();
        await expect(queryByText(/Food/)).toBeInTheDocument();
    });
});