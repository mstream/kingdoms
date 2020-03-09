// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render} from '@testing-library/react';
import type {CommonStateCity} from '../../../../common/src/state';
import {emptyCityState} from '../../../../common/src/state';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {emptyClientState} from '../../state/state';
import {CityStatusBarComponent} from '.';
import type { ClientState } from '../../state/state';

const mockStore = configureStore([]);

describe('CityStatusBarComponent', () => {
    test('renders city name and its development level', async () => {
        const city: CommonStateCity = {
            ...emptyCityState,
            buildings: {
                ...emptyCityState.buildings,
                lumberMill: {
                    ...emptyCityState.buildings.lumberMill,
                    tier: 1,
                },
                pasture: {
                    ...emptyCityState.buildings.pasture,
                    tier: 2,
                },
            },
            name: 'Cityone',
            ownerId: 'player1',
        };

        const state: ClientState = {
            ...emptyClientState,
            player: {
                ...emptyClientState.player,
                name: 'player1',
            }
        };

        const store = mockStore(state);

        const {queryByText} = render(
            <Provider store={store}>
                <CityStatusBarComponent city={city}/>
            </Provider>
        );

        await expect(queryByText('3')).toBeInTheDocument();
        await expect(queryByText('Cityone')).toBeInTheDocument();
    });
});