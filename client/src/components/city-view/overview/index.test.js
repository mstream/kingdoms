// @flow

import '@testing-library/jest-dom/extend-expect';
import {
    CityOverviewComponent,
} from './index';
import {
    Provider,
} from 'react-redux';
import {
    TAB_OVERVIEW,
    TAB_UNITS,
} from '../../../pages/world/state/modules/_children/menu/reducer/types';
import {
    UNIT_ARCHER,
    UNIT_CATAPULT,
    UNIT_KNIGHT,
    UNIT_NOBLE,
    UNIT_PEASANT,
    UNIT_PIKEMAN,
    UNIT_SWORDSMAN,
} from '../../../../../common/src/state/modules/_children/rules/reducer/types';
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
import React from 'react';
import configureStore from 'redux-mock-store';
import type {
    ClientState,
} from '../../../pages/world/state/types';

const mockStore = configureStore(
    [],
);

describe(
    `CityOverviewComponent`,
    () => {

        test(
            `does not display when tab is not the overview`,
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
                    queryByRole,
                } = render(
                    <Provider store={store}>
                        <CityOverviewComponent/>
                    </Provider>,
                );

                await expect(
                    queryByRole(
                        `tabpanel`,
                    ),
                ).not.toBeInTheDocument();

            },
        );

        test(
            `does display when tab is the overview`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                    commonState: {
                        ...emptyCommonState,
                        cities: {
                            city1: {
                                ...emptyCityState,
                                units: {
                                    ...emptyCityState.units,
                                    [ UNIT_ARCHER ]   : 100,
                                    [ UNIT_CATAPULT ] : 100,
                                    [ UNIT_KNIGHT ]   : 100,
                                    [ UNIT_NOBLE ]    : 10,
                                    [ UNIT_PEASANT ]  : 1000,
                                    [ UNIT_PIKEMAN ]  : 100,
                                    [ UNIT_SWORDSMAN ]: 100,
                                },
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
                    queryByText,
                } = render(
                    <Provider store={store}>
                        <CityOverviewComponent/>
                    </Provider>,
                );

                await expect(
                    queryByText(
                        `Peasants: 1000`,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByText(
                        `Army: 500`,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByText(
                        `Nobles: 10`,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

    },
);
