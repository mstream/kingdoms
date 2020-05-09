// @flow

import '@testing-library/jest-dom/extend-expect';
import {
    BUILDING_LUMBER_MILL,
    BUILDING_PASTURE,
} from '../../../../../../common/src/state/modules/_children/rules/reducer/types';
import {
    CityStatusBarComponent,
} from './index';
import {
    Provider,
} from 'react-redux';
import {
    emptyCityState,
} from '../../../../../../common/src/state/modules/_children/cities/reducer/state';
import {
    emptyClientState,
} from '../../../../pages/world/state/state';
import {
    render,
} from '@testing-library/react';
import React from 'react';
import configureStore from 'redux-mock-store';
import type {
    ClientState,
} from '../../../../pages/world/state/types';
import type {
    CommonStateCity,
} from '../../../../../../common/src/state/modules/_children/cities/reducer/types';

const mockStore = configureStore(
    [],
);

describe(
    `CityStatusBarComponent`,
    () => {

        test(
            `renders city name and its development level`,
            async () => {

                const city: CommonStateCity = {
                    ...emptyCityState,
                    buildings: {
                        ...emptyCityState.buildings,
                        [ BUILDING_LUMBER_MILL ]: {
                            ...emptyCityState.buildings[ BUILDING_LUMBER_MILL ],
                            tier: 1,
                        },
                        [ BUILDING_PASTURE ]: {
                            ...emptyCityState.buildings[ BUILDING_PASTURE ],
                            tier: 2,
                        },
                    },
                    name   : `Cityone`,
                    ownerId: `player1`,
                };

                const state: ClientState = {
                    ...emptyClientState,
                    player: {
                        ...emptyClientState.player,
                        name: `player1`,
                    },
                };

                const store = mockStore(
                    state,
                );

                const {
                    queryByText,
                } = render(
                    <Provider store={store}>
                        <CityStatusBarComponent city={city}/>
                    </Provider>,
                );

                await expect(
                    queryByText(
                        `3`,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByText(
                        `Cityone`,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

    },
);
