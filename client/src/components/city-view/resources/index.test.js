// @flow

import '@testing-library/jest-dom/extend-expect';
import {
    CityResourcesComponent,
} from './index';
import {
    Provider,
} from 'react-redux';
import {
    RESOURCE_FOOD,
    RESOURCE_WOOD,
} from '../../../../../common/src/state/modules/_children/rules/reducer/types';
import {
    TAB_RESOURCES,
    TAB_UNITS,
} from '../../../state/modules/_children/menu/reducer/types';
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
    emptyCommonState,
} from '../../../../../common/src/state/modules/state';
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
    `CityResourcesComponent`,
    () => {

        test(
            `does not display when tab is not the resources`,
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
                        <CityResourcesComponent/>
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
            `switches to food view after clicking the wood tab`,
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
                            resource     : RESOURCE_WOOD,
                            tab          : TAB_RESOURCES,
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
                        <CityResourcesComponent/>
                    </Provider>,
                );

                const foodTab = queryByText(
                    `Food`,
                );

                if ( foodTab == null ) {

                    throw Error(
                        `food tab not found`,
                    );

                }

                fireEvent.click(
                    foodTab,
                );

                const actions = store.getActions();

                expect(
                    actions[ 0 ],
                )
                    .toEqual(
                        clientActions.menu.selectCityViewResourcesTab(
                            {
                                resourceType: RESOURCE_FOOD,
                            },
                        ),
                    );

            },
        );

    },
);
