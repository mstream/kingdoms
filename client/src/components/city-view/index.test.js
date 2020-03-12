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
import { cityUnitsComponentTestId } from '../city-units';
import { cityResourcesComponentTestId } from '../city-resources';
import { cityBuildingsComponentTestId } from '../city-buildings';
import { cityOverviewComponentTestId } from '../city-overview';
import {
    emptyCityState,
    emptyCommonState, emptyUnitStatsState, UNIT_PEASANT,
} from '../../../../common/src/state';

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
            commonState: {
                ...emptyCommonState,
                cities: {
                    '1': {
                        ...emptyCityState,
                    },
                },
            },
        };

        const store = mockStore(state);

        const { queryByTestId } = render(
            <Provider store={store}>
                <CityViewComponent/>
            </Provider>,
        );

        await expect(queryByTestId(cityOverviewComponentTestId)).toBeInTheDocument();
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
            commonState: {
                ...emptyCommonState,
                cities: {
                    '1': {
                        ...emptyCityState,
                    },
                },
            },
        };

        const store = mockStore(state);

        const { queryByTestId } = render(
            <Provider store={store}>
                <CityViewComponent/>
            </Provider>,
        );

        await expect(queryByTestId(cityUnitsComponentTestId)).toBeInTheDocument();
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
            commonState: {
                ...emptyCommonState,
                cities: {
                    '1': {
                        ...emptyCityState,
                    },
                },
            },
        };

        const store = mockStore(state);

        const { queryByTestId } = render(
            <Provider store={store}>
                <CityViewComponent/>
            </Provider>,
        );

        await expect(queryByTestId(cityBuildingsComponentTestId)).toBeInTheDocument();
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
            commonState: {
                ...emptyCommonState,
                cities: {
                    '1': {
                        ...emptyCityState,
                    },
                },
            },
        };

        const store = mockStore(state);

        const { queryByTestId } = render(
            <Provider store={store}>
                <CityViewComponent/>
            </Provider>,
        );

        await expect(queryByTestId(cityResourcesComponentTestId)).toBeInTheDocument();
    });
});