// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import configureStore from 'redux-mock-store';
import type { ClientState } from '../../state/state';
import { emptyClientState, emptyClientStateCityTile } from '../../state/state';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { CityTileComponent } from './index';
import { cityStatusBarComponentTestId } from '../city-status-bar';
import { emptyCityState } from '../../../../common/src/state';
import { openAttackView, openCityView } from '../../state/actions';

const mockStore = configureStore([]);

describe('CityTileComponent', () => {
    test('opens city view on click if belongs to the player', async () => {
        const state: ClientState = {
            ...emptyClientState,
            player: {
                name: 'player1',
            },
        };

        const city = {
            ...emptyCityState,
            name: 'Cityone',
            ownerId: 'player1',
        };

        const cityTile = {
            ...emptyClientStateCityTile,
        };

        const cityId = '1';

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <CityTileComponent
                    city={city}
                    cityId={cityId}
                    cityTile={cityTile}
                />
            </Provider>,
        );

        const cityLabel = queryByText('Cityone');

        expect(cityLabel).toBeTruthy();

        fireEvent.click(cityLabel);

        const actions = store.getActions();

        expect(actions[0]).toEqual(openCityView({ cityId: '1' }));
    });

    test('opens attack view on click if does not belongs to the player', async () => {
        const state: ClientState = {
            ...emptyClientState,
            player: {
                name: 'player1',
            },
        };

        const city = {
            ...emptyCityState,
            name: 'Cityone',
            ownerId: 'player2',
        };

        const cityTile = {
            ...emptyClientStateCityTile,
        };

        const cityId = '1';

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <CityTileComponent
                    city={city}
                    cityId={cityId}
                    cityTile={cityTile}
                />
            </Provider>,
        );

        const cityLabel = queryByText('Cityone');

        expect(cityLabel).toBeTruthy();

        fireEvent.click(cityLabel);

        const actions = store.getActions();

        expect(actions[0]).toEqual(openAttackView({ cityId: '1' }));
    });
});