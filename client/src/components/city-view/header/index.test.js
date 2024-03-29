// @flow

import '@testing-library/jest-dom/extend-expect';
import {
    CityHeaderComponent,
} from './index';
import {
    Provider,
} from 'react-redux';
import {
    emptyCityState,
} from '../../../../../common/src/state/modules/_children/cities/reducer/state';
import {
    emptyClientState,
} from '../../../pages/world/state/state';
import {
    emptyCommonState,
} from '../../../../../common/src/state/modules/state';
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

const mockStore = configureStore(
    [],
);

describe(
    `CityHeaderComponent`,
    () => {

        test(
            `does not show up when there is no city currently viewed`,
            async () => {

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

                const store = mockStore(
                    state,
                );

                const {
                    queryByTestId,
                } = render(
                    <Provider store={store}>
                        <CityHeaderComponent/>
                    </Provider>,
                );

                expect(
                    queryByTestId(
                        testIds.cityView.parent,
                    ),
                ).not.toBeInTheDocument();

            },
        );

        test(
            `shows up with no nav buttons when the player has only one city`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                    commonState: {
                        ...emptyCommonState,
                        cities: {
                            ...emptyCommonState.cities,
                            city1: {
                                ...emptyCityState,
                                name   : `Cityone`,
                                ownerId: `player1`,
                            },
                        },
                    },
                    menu: {
                        ...emptyClientState.menu,
                        cityView: {
                            ...emptyClientState.menu.cityView,
                            currentCityId: `city1`,
                        },
                    },
                    player: {
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
                        <CityHeaderComponent/>
                    </Provider>,
                );

                expect(
                    queryByText(
                        `Cityone`,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

    },
);
