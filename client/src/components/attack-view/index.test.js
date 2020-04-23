// @flow

import '@testing-library/jest-dom/extend-expect';
import {
    Provider,
} from 'react-redux';
import {
    fireEvent, render,
} from '@testing-library/react';
import React from 'react';
import configureStore from 'redux-mock-store';

import {
    AttackViewComponent,
} from './index';
import {
    UNIT_PIKEMAN,
} from '../../../../common/src/state/modules/_children/rules/reducer/types';
import {
    clientActions,
} from '../../state/modules/actions';
import {
    emptyCityState,
} from '../../../../common/src/state/modules/_children/cities/reducer/state';
import {
    emptyClientState,
} from '../../state/state';
import {
    emptyCommonState,
} from '../../../../common/src/state/modules/state';
import {
    emptyRegimentTemplateState,
} from '../../../../common/src/state/modules/_children/orders/reducer/state';
import {
    testIds,
} from '../../../../common/src/ui';
import type {
    ClientState,
} from '../../state/types';

const mockStore = configureStore(
    [],
);

describe(
    `AttackViewComponent`,
    () => {

        test(
            `does not show up when attacked city is not selected`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                    menu: {
                        ...emptyClientState.menu,
                        attackView: {
                            ...emptyClientState.menu.attackView,
                            attackedCityId: null,
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
                        <AttackViewComponent/>
                    </Provider>,
                );

                await expect(
                    queryByTestId(
                        testIds.attackView.parent,
                    ),
                ).not.toBeInTheDocument();

            },
        );

        test(
            `displays only cities list when attacking city is not selected`,
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
                                ownerId: `player2`,
                            },
                            city2: {
                                ...emptyCityState,
                                name   : `Citytwo`,
                                ownerId: `player1`,
                            },
                        },
                    },
                    menu: {
                        ...emptyClientState.menu,
                        attackView: {
                            ...emptyClientState.menu.attackView,
                            attackedCityId: `city1`,
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
                    queryByTestId, queryByText,
                } = render(
                    <Provider store={store}>
                        <AttackViewComponent/>
                    </Provider>,
                );

                await expect(
                    queryByText(
                        `Cityone`,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByTestId(
                        testIds.attackView.cityList,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByTestId(
                        testIds.attackView.regimentTemplateForm,
                    ),
                ).not.toBeInTheDocument();

            },
        );

        test(
            `displays both cities list and regiment template form when attacking city is selected`,
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
                                ownerId: `player2`,
                            },
                            city2: {
                                ...emptyCityState,
                                name   : `Citytwo`,
                                ownerId: `player2`,
                            },
                        },
                    },
                    menu: {
                        ...emptyClientState.menu,
                        attackView: {
                            ...emptyClientState.menu.attackView,
                            attackedCityId : `city1`,
                            attackingCityId: `city2`,
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
                    queryByTestId, queryByText,
                } = render(
                    <Provider store={store}>
                        <AttackViewComponent/>
                    </Provider>,
                );

                await expect(
                    queryByText(
                        `Cityone`,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByTestId(
                        testIds.attackView.cityList,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByTestId(
                        testIds.attackView.regimentTemplateForm,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

        test(
            `requests an order creation on a button click when the form is valid`,
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
                                ownerId: `player2`,
                            },
                            city2: {
                                ...emptyCityState,
                                name   : `Citytwo`,
                                ownerId: `player1`,
                            },
                        },
                    },
                    menu: {
                        ...emptyClientState.menu,
                        attackView: {
                            ...emptyClientState.menu.attackView,
                            attackedCityId  : `city1`,
                            attackingCityId : `city2`,
                            minimumDelay    : 60,
                            regimentTemplate: {
                                ...emptyRegimentTemplateState,
                                [ UNIT_PIKEMAN ]: {
                                    from: 50,
                                    to  : 100,
                                },
                            },
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
                        <AttackViewComponent/>
                    </Provider>,
                );

                const scheduleAttackButton = queryByText(
                    `Schedule Attack`,
                );

                if ( scheduleAttackButton == null ) {

                    throw Error(
                        `schedule attack button not found`,
                    );

                }

                fireEvent.click(
                    scheduleAttackButton,
                );

                const actions = store.getActions();

                expect(
                    actions[ 0 ],
                )
                    .toEqual(
                        clientActions.commonState.requestOrderCreation(
                            {
                                minimumDelay    : 60,
                                originCityId    : `city2`,
                                regimentTemplate: {
                                    ...emptyRegimentTemplateState,
                                    [ UNIT_PIKEMAN ]: {
                                        from: 50,
                                        to  : 100,
                                    },
                                },
                                targetCityId: `city1`,
                            },
                        ),
                    );

            },
        );

    },
);
