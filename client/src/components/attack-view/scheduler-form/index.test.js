// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { attackViewSchedulerFormComponentTestId } from '.';
import type { ClientState } from '../../../state/modules/types';
import { emptyClientState } from '../../../state/modules/types';
import { AttackViewSchedulerFormComponent } from './index';

const mockStore = configureStore([]);

describe('AttackViewSchedulerFormComponent', () => {
    test('does not display when attacking city is not selected', async () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackingCityId: null,
                },
            },
        };

        const store = mockStore(state);

        const { queryByTestId } = render(
            <Provider store={store}>
                <AttackViewSchedulerFormComponent/>
            </Provider>,
        );

        await expect(queryByTestId(attackViewSchedulerFormComponentTestId)).not.toBeInTheDocument();
    });

    test('displays a scheduled delay - no delay', async () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackingCityId: 'city1',
                    minimumDelay: 0,
                },
            },
        };

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <AttackViewSchedulerFormComponent/>
            </Provider>,
        );

        await expect(queryByText('As soon as possible')).toBeInTheDocument();
    });

    test('displays a scheduled delay - 2 minutes delay', async () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackingCityId: 'city1',
                    minimumDelay: 2,
                },
            },
        };

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <AttackViewSchedulerFormComponent />
            </Provider>,
        );

        await expect(queryByText('Not earlier than in')).toBeInTheDocument();
        await expect(queryByText('2m')).toBeInTheDocument();
    });

    test('displays a scheduled delay - 2 hours and two minutes delay', async () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackingCityId: 'city1',
                    minimumDelay: 122,
                },
            },
        };

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <AttackViewSchedulerFormComponent/>
            </Provider>,
        );

        await expect(queryByText('Not earlier than in')).toBeInTheDocument();
        await expect(queryByText('2h 2m')).toBeInTheDocument();
    });
});