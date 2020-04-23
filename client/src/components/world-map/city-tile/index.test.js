// @flow

import '@testing-library/jest-dom/extend-expect';
import {
    CityTileComponent,
} from './index';
import {
    Provider,
} from 'react-redux';
import {
    clientActions,
} from '../../../state/modules/actions';
import {
    emptyCityState,
} from '../../../../../common/src/state/modules/_children/cities/reducer/state';
import {
    emptyClientState,
} from '../../../state/state';
import {
    emptyClientStateCityTile,
} from '../../../state/modules/_children/tiles/reducer/state';
import {
    fireEvent, render,
} from '@testing-library/react';
import React from 'react';
import configureStore from 'redux-mock-store';
import type {
    ClientState,
} from '../../../state/types';

const mockStore = configureStore(
    [],
);

describe(
    `CityTileComponent`,
    () => {

        test(
            `opens city view on click if belongs to the player`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                    player: {
                        name: `player1`,
                    },
                };

                const city = {
                    ...emptyCityState,
                    name   : `Cityone`,
                    ownerId: `player1`,
                };

                const cityTile = {
                    ...emptyClientStateCityTile,
                };

                const cityId = `city1`;

                const store = mockStore(
                    state,
                );

                const {
                    queryByText,
                } = render(
                    <Provider store={store}>
                        <CityTileComponent
                            city={city}
                            cityId={cityId}
                            cityTile={cityTile}
                        />
                    </Provider>,
                );

                const cityLabel = queryByText(
                    `Cityone`,
                );

                if ( cityLabel == null ) {

                    throw Error(
                        `city label not found`,
                    );

                }

                fireEvent.click(
                    cityLabel,
                );

                const actions = store.getActions();

                expect(
                    actions[ 0 ],
                )
                    .toEqual(
                        clientActions.menu.openCityView(
                            {
                                cityId: `city1`,
                            },
                        ),
                    );

            },
        );

        test(
            `opens attack view on click if does not belongs to the player`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                    player: {
                        name: `player1`,
                    },
                };

                const city = {
                    ...emptyCityState,
                    name   : `Cityone`,
                    ownerId: `player2`,
                };

                const cityTile = {
                    ...emptyClientStateCityTile,
                };

                const cityId = `city1`;

                const store = mockStore(
                    state,
                );

                const {
                    queryByText,
                } = render(
                    <Provider store={store}>
                        <CityTileComponent
                            city={city}
                            cityId={cityId}
                            cityTile={cityTile}
                        />
                    </Provider>,
                );

                const cityLabel = queryByText(
                    `Cityone`,
                );

                if ( cityLabel == null ) {

                    throw Error(
                        `city label not found`,
                    );

                }

                fireEvent.click(
                    cityLabel,
                );

                const actions = store.getActions();

                expect(
                    actions[ 0 ],
                )
                    .toEqual(
                        clientActions.menu.openAttackView(
                            {
                                cityId: `city1`,
                            },
                        ),
                    );

            },
        );

    },
);
