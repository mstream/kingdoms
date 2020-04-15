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
} from '../../../state/modules/_children/menu/reducer/types';
import {
    emptyCityState,
} from '../../../../../common/src/state/modules/cities/reducer/state';
import {
    emptyClientState,
} from '../../../state/state';
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
} from '../../../state/types';

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
                )
                    .toBeInTheDocument();

            },
        );

    },
);
