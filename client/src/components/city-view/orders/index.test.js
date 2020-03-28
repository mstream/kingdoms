// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { CityOrdersComponent, cityOrdersComponentTestId } from './index';
import {
    TAB_ORDERS,
    TAB_UNITS,
} from '../../../state/modules/_children/menu/reducer/types';
import { emptyCommonState } from '../../../../../common/src/state/modules/state';
import { emptyCityState } from '../../../../../common/src/state/modules/cities/reducer/state';
import { emptyClientState } from '../../../state/state';
import { emptyOrderState } from '../../../../../common/src/state/modules/orders/reducer/state';
import type { ClientState } from '../../../state/types';

const mockStore = configureStore([]);

describe('CityOrdersComponent', () => {
    test('does not display when tab is not the orders', async () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: 'city1',
                    tab: TAB_UNITS,
                },
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    'city1': {
                        ...emptyCityState,
                    },
                },
            },
        };

        const store = mockStore(state);

        const { queryByTestId } = render(
            <Provider store={store}>
                <CityOrdersComponent/>
            </Provider>,
        );

        await expect(queryByTestId(cityOrdersComponentTestId)).not.toBeInTheDocument();
    });

    test('displays orders which are related to the city', async () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: 'city1',
                    tab: TAB_ORDERS,
                },
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    'city1': {
                        ...emptyCityState,
                        name: 'Cityone',
                    },
                    'city2': {
                        ...emptyCityState,
                        name: 'Citytwo',
                    },
                    'city3': {
                        ...emptyCityState,
                        name: 'Citythree',
                    },
                    'city4': {
                        ...emptyCityState,
                        name: 'Cityfour',
                    },
                },
                orders: {
                    'order1': {
                        ...emptyOrderState,
                        originCityId: 'city1',
                        targetCityId: 'city2',
                    },
                    'order2': {
                        ...emptyOrderState,
                        originCityId: 'city3',
                        targetCityId: 'city1',
                    },
                    'order3': {
                        ...emptyOrderState,
                        originCityId: 'city4',
                        targetCityId: 'city4',
                    },
                },
            },
        };

        const store = mockStore(state);

        const { debug, queryByText } = render(
            <Provider store={store}>
                <CityOrdersComponent/>
            </Provider>,
        );

        debug();

        await expect(queryByText('Citytwo')).toBeInTheDocument();
        await expect(queryByText('Citythree')).toBeInTheDocument();
        await expect(queryByText('Citytfour')).not.toBeInTheDocument();
    });
});