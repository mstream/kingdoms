// @flow

import '@testing-library/jest-dom/extend-expect';
import {
    Provider,
} from 'react-redux';
import {
    TerrainTileComponent,
} from './index';
import {
    emptyClientState,
} from '../../../pages/world/state/state';
import {
    emptyClientStateTerrainTile,
} from '../../../pages/world/state/modules/_children/tiles/reducer/state';
import {
    render,
} from '@testing-library/react';
import {
    testIds,
} from '../../../../../common/src/ui';
import React from 'react';
import configureStore from 'redux-mock-store';
import type {
    ClientState,
} from '../../../pages/world/state/types';
import type {
    ClientStateTile,
} from '../../../pages/world/state/modules/_children/tiles/reducer/types';

const mockStore = configureStore(
    [],
);

describe(
    `TerrainTile`,
    () => {

        test(
            `renders`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                };

                const tile: ClientStateTile = {
                    ...emptyClientStateTerrainTile,
                };

                const store = mockStore(
                    state,
                );

                const {
                    queryByTestId,
                } = render(
                    <Provider store={store}>
                        <TerrainTileComponent tile={tile}/>
                    </Provider>,
                );

                expect(
                    queryByTestId(
                        testIds.worldMap.terrainTile,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

    },
);
