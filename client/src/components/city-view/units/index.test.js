// @flow

import '@testing-library/jest-dom/extend-expect';
import {
    CityUnitsComponent,
} from './index';
import {
    Provider,
} from 'react-redux';
import {
    TAB_RESOURCES,
    TAB_UNITS,
} from '../../../pages/world/state/modules/_children/menu/reducer/types';
import {
    UNIT_PEASANT,
    UNIT_PIKEMAN,
} from '../../../../../common/src/state/modules/_children/rules/reducer/types';
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
    `CityUnitsComponent`,
    () => {

        test(
            `does not display when tab is not the units`,
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
                    queryByRole,
                } = render(
                    <Provider store={store}>
                        <CityUnitsComponent/>
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
            `switches to peasants view after clicking the peasants tab`,
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
                            unit         : UNIT_PIKEMAN,
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
                        <CityUnitsComponent/>
                    </Provider>,
                );

                const peasantsTab = queryByText(
                    `Peasants`,
                );

                if ( peasantsTab == null ) {

                    throw Error(
                        `peasants tab not found`,
                    );

                }

                fireEvent.click(
                    peasantsTab,
                );

                const actions = store.getActions();

                expect(
                    actions[ 0 ],
                )
                    .toEqual(
                        clientActions.menu.selectCityViewUnitsTab(
                            {
                                unitType: UNIT_PEASANT,
                            },
                        ),
                    );

            },
        );

    },
);
