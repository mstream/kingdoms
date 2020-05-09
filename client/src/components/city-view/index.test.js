// @flow

import '@testing-library/jest-dom/extend-expect';
import {
    CityViewComponent,
} from '.';
import {
    Provider,
} from 'react-redux';
import {
    TAB_BUILDINGS,
    TAB_OVERVIEW,
    TAB_RESOURCES,
    TAB_UNITS,
} from '../../pages/world/state/modules/_children/menu/reducer/types';
import {
    emptyCityState,
} from '../../../../common/src/state/modules/_children/cities/reducer/state';
import {
    emptyClientState,
} from '../../pages/world/state/state';
import {
    emptyCommonState,
} from '../../../../common/src/state/modules/state';
import {
    render,
} from '@testing-library/react';
import {
    testIds,
} from '../../../../common/src/ui';
import React from 'react';
import configureStore from 'redux-mock-store';
import type {
    ClientState,
} from '../../pages/world/state/types';

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
                        testIds.cityView.overviewPanel,
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
                        testIds.cityView.unitsPanel,
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
                        testIds.cityView.buildingsPanel,
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
                        testIds.cityView.resourcesPanel,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

    },
);
