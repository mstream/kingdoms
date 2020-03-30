// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
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
import {
    emptyRegimentTemplateState,
    emptyScheduledAttackOrderState,
} from '../../../../../common/src/state/modules/orders/reducer/state';
import type { ClientState } from '../../../state/types';
import { UNIT_PIKEMAN } from '../../../../../common/src/state/modules/rules/reducer/types';
import { clientActions } from '../../../state/modules/actions';

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
                    orderId: 'order4',
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
                    'city5': {
                        ...emptyCityState,
                        name: 'Cityfive',
                    },
                },
                orders: {
                    ...emptyCommonState.orders,
                    creationTimes: {
                        'order1': '2000-01-01T01:00:00Z',
                        'order2': '2000-01-01T02:00:00Z',
                        'order3': '2000-01-01T03:00:00Z',
                        'order4': '2000-01-01T04:00:00Z',
                    },
                    items: {
                        scheduledAttack: {
                            'order1': {
                                ...emptyScheduledAttackOrderState,
                                originCityId: 'city1',
                                regimentTemplate: {
                                    ...emptyRegimentTemplateState,
                                    [UNIT_PIKEMAN]: {
                                        from: 100,
                                        to: 200,
                                    },
                                },
                                targetCityId: 'city2',
                            },
                            'order2': {
                                ...emptyScheduledAttackOrderState,
                                originCityId: 'city3',
                                targetCityId: 'city1',
                            },
                            'order3': {
                                ...emptyScheduledAttackOrderState,
                                originCityId: 'city4',
                                targetCityId: 'city4',
                            },
                            'order4': {
                                ...emptyScheduledAttackOrderState,
                                originCityId: 'city1',
                                regimentTemplate: {
                                    ...emptyRegimentTemplateState,
                                    [UNIT_PIKEMAN]: {
                                        from: 300,
                                        to: 400,
                                    },
                                },
                                targetCityId: 'city5',
                            },
                        },
                    },
                },
                time: '2000-01-01T00:00:00Z',
            },
        };

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <CityOrdersComponent/>
            </Provider>,
        );

        await expect(queryByText('Attack Citytwo')).toBeInTheDocument();
        await expect(queryByText('in 1h')).toBeInTheDocument();
        await expect(queryByText('100 - 200')).not.toBeInTheDocument();
        await expect(queryByText('Attack Cityfive')).toBeInTheDocument();
        await expect(queryByText('in 4h')).toBeInTheDocument();
        await expect(queryByText('300 - 400')).toBeInTheDocument();
        await expect(queryByText('Attack Cityone')).not.toBeInTheDocument();
        await expect(queryByText('in 2h')).not.toBeInTheDocument();
        await expect(queryByText('Attack Citytfour')).not.toBeInTheDocument();
        await expect(queryByText('in 3h')).not.toBeInTheDocument();
    });

    test('selects orders after clicking on their summaries', async () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: 'city1',
                    orderId: 'order4',
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
                    'city5': {
                        ...emptyCityState,
                        name: 'Cityfive',
                    },
                },
                orders: {
                    ...emptyCommonState.orders,
                    creationTimes: {
                        'order1': '2000-01-01T01:00:00Z',
                        'order4': '2000-01-01T04:00:00Z',
                    },
                    items: {
                        scheduledAttack: {
                            'order1': {
                                ...emptyScheduledAttackOrderState,
                                originCityId: 'city1',
                                targetCityId: 'city2',
                            },
                            'order4': {
                                ...emptyScheduledAttackOrderState,
                                originCityId: 'city1',
                                targetCityId: 'city5',
                            },
                        },
                    },
                },
                time: '2000-01-01T00:00:00Z',
            },
        };

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <CityOrdersComponent/>
            </Provider>,
        );

        const orderSummary = queryByText('Attack Citytwo');

        if (orderSummary == null) {
            throw Error('order summary not found');
        }

        fireEvent.click(orderSummary);
        const actions = store.getActions();

        expect(actions[0]).toEqual(clientActions.menu.selectCityViewOrdersTab({
            orderId: 'order1',
        }));
    });
});