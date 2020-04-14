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
    CityViewComponent,
} from '.';
import {
    cityUnitsComponentTestId,
} from './units';
import {
    cityResourcesComponentTestId,
} from './resources';
import {
    cityBuildingsComponentTestId,
} from './buildings';
import {
    cityOverviewComponentTestId,
} from './overview';
import {
    TAB_BUILDINGS,
    TAB_OVERVIEW,
    TAB_RESOURCES,
    TAB_UNITS,
} from '../../state/modules/_children/menu/reducer/types';
import {
    emptyCommonState,
} from '../../../../common/src/state/modules/state';
import {
    emptyCityState,
} from '../../../../common/src/state/modules/cities/reducer/state';
import {
    emptyClientState,
} from '../../state/state';
import type {
    ClientState,
} from '../../state/types';

const mockStore = configureStore(
    [],
);

describe(
    `CityViewComponent`,
    () => {

        test(
            `displays city overview when the overview tab is active`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                    commonState: {
                        ...emptyCommonState,
                        cities: {
                            city1: {
                                ...emptyCityState,
                            },
                        },
                    },
                    menu: {
                        ...emptyClientState.menu,
                        cityView: {
                            ...emptyClientState.menu.cityView,
                            currentCityId: `city1`,
                            tab          : TAB_OVERVIEW,
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
                        <CityViewComponent/>
                    </Provider>,
                );

                await expect(
                    queryByTestId(
                        cityOverviewComponentTestId,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

        test(
            `displays units when the units tab is active`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                    commonState: {
                        ...emptyCommonState,
                        cities: {
                            city1: {
                                ...emptyCityState,
                            },
                        },
                    },
                    menu: {
                        ...emptyClientState.menu,
                        cityView: {
                            ...emptyClientState.menu.cityView,
                            currentCityId: `city1`,
                            tab          : TAB_UNITS,
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
                        <CityViewComponent/>
                    </Provider>,
                );

                await expect(
                    queryByTestId(
                        cityUnitsComponentTestId,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

        test(
            `displays buildings when the buildings tab is active`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                    commonState: {
                        ...emptyCommonState,
                        cities: {
                            city1: {
                                ...emptyCityState,
                            },
                        },
                    },
                    menu: {
                        ...emptyClientState.menu,
                        cityView: {
                            ...emptyClientState.menu.cityView,
                            currentCityId: `city1`,
                            tab          : TAB_BUILDINGS,
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
                        <CityViewComponent/>
                    </Provider>,
                );

                await expect(
                    queryByTestId(
                        cityBuildingsComponentTestId,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

        test(
            `displays resources when the resources tab is active`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                    commonState: {
                        ...emptyCommonState,
                        cities: {
                            city1: {
                                ...emptyCityState,
                            },
                        },
                    },
                    menu: {
                        ...emptyClientState.menu,
                        cityView: {
                            ...emptyClientState.menu.cityView,
                            currentCityId: `city1`,
                            tab          : TAB_RESOURCES,
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
                        <CityViewComponent/>
                    </Provider>,
                );

                await expect(
                    queryByTestId(
                        cityResourcesComponentTestId,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

    },
);
