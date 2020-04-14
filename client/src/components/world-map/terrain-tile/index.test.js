// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {
    render,
} from '@testing-library/react';
import {
    Provider,
} from 'react-redux';
import configureStore from 'redux-mock-store';
import {
    TerrainTileComponent,
} from './index';
import type {
    ClientStateTile,
} from '../../../state/modules/_children/tiles/reducer/types';
import {
    emptyClientStateTerrainTile,
} from '../../../state/modules/_children/tiles/reducer/state';
import {
    emptyClientState,
} from '../../../state/state';
import type {
    ClientState,
} from '../../../state/types';
import {
    testIds,
} from '../../../../../common/src/ui';

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
                        testIds.COMPONENT_WORLD_MAP.TERRAIN_TILE,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

    },
);
