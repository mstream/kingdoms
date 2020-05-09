// @flow

import '@testing-library/jest-dom/extend-expect';
import {
    BUILDING_PASTURE,
    BUILDING_WAREHOUSE,
} from '../../../../../common/src/state/modules/_children/rules/reducer/types';
import {
    CityBuildingsComponent,
} from './index';
import {
    Provider,
} from 'react-redux';
import {
    TAB_BUILDINGS,
    TAB_UNITS,
} from '../../../pages/world/state/modules/_children/menu/reducer/types';
import {
    clientActions,
} from '../../../pages/world/state/modules/actions';
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
    fireEvent, render,
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
    `CityResourcesComponent`,
    () => {

        test(
            `does not display when tab is not the buildings`,
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
                        <CityBuildingsComponent/>
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
            `does display when tab is the buildings`,
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
                            building     : BUILDING_PASTURE,
                            currentCityId: `city1`,
                            tab          : TAB_BUILDINGS,
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
                        <CityBuildingsComponent/>
                    </Provider>,
                );

                const warehouseTab = queryByText(
                    `Warehouse`,
                );

                if ( warehouseTab == null ) {

                    throw Error(
                        `warehouse tab not found`,
                    );

                }

                fireEvent.click(
                    warehouseTab,
                );

                const actions = store.getActions();

                expect(
                    actions[ 0 ],
                )
                    .toEqual(
                        clientActions.menu.selectCityViewBuildingsTab(
                            {
                                buildingType: BUILDING_WAREHOUSE,
                            },
                        ),
                    );

            },
        );

    },
);
