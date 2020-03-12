// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import configureStore from 'redux-mock-store';
import type { ClientState } from '../../state/state';
import { emptyClientState, emptyClientStateCityTile } from '../../state/state';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { CityTileComponent } from './index';
import { cityStatusBarComponentTestId } from '../city-status-bar';
import { emptyCityState } from '../../../../common/src/state';

const mockStore = configureStore([]);

describe('CityTileComponent', () => {
    test('renders', async () => {
        const state: ClientState = {
            ...emptyClientState,
        };

        const city = {
            ...emptyCityState,
        };

        const cityTile = {
            ...emptyClientStateCityTile,
        };

        const cityId = '1';

        const store = mockStore(state);

        const { queryByTestId } = render(
            <Provider store={store}>
                <CityTileComponent
                    city={city}
                    cityId={cityId}
                    cityTile={cityTile}/>
            </Provider>,
        );

        expect(queryByTestId(cityStatusBarComponentTestId)).toBeInTheDocument();
    });
});