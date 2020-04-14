// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {
    fireEvent, render,
} from '@testing-library/react';
import {
    Provider,
} from 'react-redux';
import configureStore from 'redux-mock-store';
import {
    CityBuildingsComponent,
} from './index';
import {
    TAB_BUILDINGS,
    TAB_UNITS,
} from '../../../state/modules/_children/menu/reducer/types';
import {
    BUILDING_PASTURE,
    BUILDING_WAREHOUSE,
} from '../../../../../common/src/state/modules/rules/reducer/types';
import {
    emptyCommonState,
} from '../../../../../common/src/state/modules/state';
import {
    emptyCityState,
} from '../../../../../common/src/state/modules/cities/reducer/state';
import {
    emptyClientState,
} from '../../../state/state';
import type {
    ClientState,
} from '../../../state/types';
import {
    clientActions,
} from '../../../state/modules/actions';

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
