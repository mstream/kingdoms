// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AttackViewComponent } from '.';
import {
    emptyCityState,
    emptyCommonState,
} from '../../../../common/src/state';
import { emptyClientState } from '../../state/modules/types';
import type { ClientState } from '../../state/modules/root';

const mockStore = configureStore([]);

describe('AttackViewComponent', () => {
    test('displays the attack form', async () => {
        const state: ClientState = {
            ...emptyClientState,
            commonState: {
                ...emptyCommonState,
                cities: {
                    '1': {
                        ...emptyCityState,
                        location: {
                            x: 0,
                            y: 0,
                        },
                        name: 'EnemyCityOne',
                        ownerId: 'player2',
                    },
                    '2': {
                        ...emptyCityState,
                        location: {
                            x: 1,
                            y: 0,
                        },
                        name: 'PlayerCityOne',
                        ownerId: 'player1',
                    },
                    '3': {
                        ...emptyCityState,
                        location: {
                            x: 2,
                            y: 0,
                        },
                        name: 'PlayerCityTwo',
                        ownerId: 'player1',
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
            player: {
                name: 'player1',
            },
        };

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <AttackViewComponent/>
            </Provider>,
        );

        await expect(queryByText('EnemyCityOne')).toBeInTheDocument();
        await expect(queryByText('PlayerCityOne')).toBeInTheDocument();
        await expect(queryByText('PlayerCityTwo')).toBeInTheDocument();
        await expect(queryByText('1 square away')).toBeInTheDocument();
        await expect(queryByText('2 squares away')).toBeInTheDocument();
    });
});