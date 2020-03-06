// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render} from '@testing-library/react';
import type {CommonStateCity} from '../../../../common/src/state';
import {emptyCityState} from '../../../../server/src/state/state';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {emptyClientState} from '../../state/state';
import {CityOwnerBarComponent} from '.';

const mockStore = configureStore([]);

describe('CityOwnerBarComponent', () => {
    test('renders city name and its development level', () => {
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

        const state = {
            ...emptyClientState,
        };

        const store = mockStore(state);

        const {getByText} = render(
            <Provider store={store}>
                <CityOwnerBarComponent city={city}/>
            </Provider>
        );
        expect(getByText('player1')).toBeInTheDocument();
    });
});