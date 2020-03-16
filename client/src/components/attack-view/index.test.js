// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AttackViewComponent, attackViewComponentTestId } from '.';
import { emptyCityState, emptyCommonState } from '../../../../common/src/state';
import { emptyClientState } from '../../state/modules/types';
import type { ClientState } from '../../state/modules/root';
import { attackViewCityListComponentTestId } from './city-list';
import { attackViewRegimentTemplateFormComponentTestId } from './regiment-template-form';

const mockStore = configureStore([]);

describe('AttackViewComponent', () => {
    test('does not show up when attacked city is not selected', async () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackedCityId: null,
                },
            },
        };

        const store = mockStore(state);

        const { queryByTestId } = render(
            <Provider store={store}>
                <AttackViewComponent/>
            </Provider>,
        );

        await expect(queryByTestId(attackViewComponentTestId)).not.toBeInTheDocument();
    });

    test('displays only cities list when attacking city is not selected', async () => {
        const state: ClientState = {
            ...emptyClientState,
            commonState: {
                ...emptyCommonState,
                cities: {
                    ...emptyCommonState.cities,
                    '1': {
                        ...emptyCityState,
                        name: 'Cityone',
                    },
                    '2': {
                        ...emptyCityState,
                    },
                },
            },
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackedCityId: '1',
                },
            },
        };

        const store = mockStore(state);

        const { queryByTestId, queryByText } = render(
            <Provider store={store}>
                <AttackViewComponent/>
            </Provider>,
        );

        await expect(queryByText('Cityone')).toBeInTheDocument();
        await expect(queryByTestId(attackViewCityListComponentTestId)).toBeInTheDocument();
        await expect(queryByTestId(attackViewRegimentTemplateFormComponentTestId)).not.toBeInTheDocument();
    });

    test('displays both cities list and regiment template form when attacking city is selected', async () => {
        const state: ClientState = {
            ...emptyClientState,
            commonState: {
                ...emptyCommonState,
                cities: {
                    ...emptyCommonState.cities,
                    '1': {
                        ...emptyCityState,
                        name: 'Cityone',
                    },
                    '2': {
                        ...emptyCityState,
                    },
                },
            },
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackedCityId: '1',
                    attackingCityId: '2',
                },
            },
        };

        const store = mockStore(state);

        const { queryByTestId, queryByText } = render(
            <Provider store={store}>
                <AttackViewComponent/>
            </Provider>,
        );

        await expect(queryByText('Cityone')).toBeInTheDocument();
        await expect(queryByTestId(attackViewCityListComponentTestId)).toBeInTheDocument();
        await expect(queryByTestId(attackViewRegimentTemplateFormComponentTestId)).toBeInTheDocument();
    });
});