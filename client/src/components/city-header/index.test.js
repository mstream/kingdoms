// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import configureStore from 'redux-mock-store';
import type { ClientState } from '../../state/state';
import { emptyClientState } from '../../state/state';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { CityHeaderComponent, cityHeaderComponentTestId } from './index';
import { emptyCityState, emptyCommonState } from '../../../../common/src/state';

const mockStore = configureStore([]);

describe('CityHeaderComponent', () => {
    test('does not show up when there is no city currently viewed', async () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: null,
                },
            },
        };

        const store = mockStore(state);

        const { queryByTestId } = render(
            <Provider store={store}>
                <CityHeaderComponent/>
            </Provider>,
        );

        expect(queryByTestId(cityHeaderComponentTestId)).not.toBeInTheDocument();
    });

    test('shows up with no navigation buttons when the player has only one city', async () => {
        const state: ClientState = {
            ...emptyClientState,
            commonState: {
                ...emptyCommonState,
                cities: {
                    ...emptyCommonState.cities,
                    '1': {
                        ...emptyCityState,
                        name: 'Cityone',
                        ownerId: 'player1',
                    },
                },
            },
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: '1',
                },
            },
            player: {
                name: 'player1',
            },
        };

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <CityHeaderComponent/>
            </Provider>,
        );

        expect(queryByText('Cityone')).toBeInTheDocument();
    });

    // TODO test that navigation buttons show up when the player has more than one city
});