// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { emptyClientState } from '../../../state/modules/types';
import type { ClientState } from '../../../state/modules/root';
import { AttackViewCityListComponent } from './index';
import {
    emptyCityState,
    emptyCommonState,
} from '../../../../../common/src/state';

const mockStore = configureStore([]);

describe('AttackViewCityListComponent', () => {
    test('displays a city list with distances', async () => {
        const state: ClientState = {
            ...emptyClientState,
            commonState: {
                ...emptyCommonState,
                cities: {
                    '1': {
                        ...emptyCityState,
                        location: { x: 0, y: 0 },
                        name: 'Cityone',
                        ownerId: 'player2',
                    },
                    '2': {
                        ...emptyCityState,
                        location: { x: 0, y: -4 },
                        name: 'Citytwo',
                        ownerId: 'player3',
                    },
                    '3': {
                        ...emptyCityState,
                        location: { x: 2, y: 0 },
                        name: 'Citythree',
                        ownerId: 'player1',
                    },
                    '4': {
                        ...emptyCityState,
                        location: { x: 0, y: 3 },
                        name: 'Cityfour',
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
                <AttackViewCityListComponent/>
            </Provider>,
        );


        await expect(queryByText('Citythree')).toBeInTheDocument();
        await expect(queryByText('Cityfour')).toBeInTheDocument();
        await expect(queryByText('Cityone')).not.toBeInTheDocument();
        await expect(queryByText('Citytwo')).not.toBeInTheDocument();
        await expect(queryByText('2 squares away')).toBeInTheDocument();
        await expect(queryByText('3 squares away')).toBeInTheDocument();
        await expect(queryByText('4 squares away')).not.toBeInTheDocument();
    });
});