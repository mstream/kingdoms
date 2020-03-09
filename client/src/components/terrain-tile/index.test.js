// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import type { ClientState, ClientStateTile } from '../../state/state';
import {
    emptyClientState,
    emptyClientStateTerrainTile,
} from '../../state/state';
import { TerrainTileComponent } from './index';

const mockStore = configureStore([]);

describe('TerrainTile', () => {
    test('renders', async () => {
        const state: ClientState = {
            ...emptyClientState,
        };

        const tile: ClientStateTile = {
            ...emptyClientStateTerrainTile,
        };

        const store = mockStore(state);

        render(
            <Provider store={store}>
                <TerrainTileComponent tile={tile}/>
            </Provider>,
        );
    });
});