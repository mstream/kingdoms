// @flow

import '@testing-library/jest-dom/extend-expect';
import {
    CityOrdersScheduledAttackItemComponent,
} from './index';
import {
    Provider,
} from 'react-redux';
import {
    emptyCityState,
} from '../../../../../../common/src/state/modules/cities/reducer/state';
import {
    emptyClientState,
} from '../../../../state/state';
import {
    emptyCommonState,
} from '../../../../../../common/src/state/modules/state';
import {
    emptyScheduledAttackOrderState,
} from '../../../../../../common/src/state/modules/orders/reducer/state';
import {
    render,
} from '@testing-library/react';
import React from 'react';
import configureStore from 'redux-mock-store';
import type {
    ClientState,
} from '../../../../state/types';
import type {
    ScheduledAttackOrderInfo,
} from '../../../../state/modules/selectors/types';

const mockStore = configureStore(
    [],
);

describe(
    `CityOrdersScheduledAttackItemComponent`,
    () => {

        test(
            `order scheduled in future`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                    commonState: {
                        ...emptyCommonState,
                        cities: {
                            city2: {
                                ...emptyCityState,
                                name: `Citytwo`,
                            },
                        },
                        time: `2000-01-01T02:00:00Z`,
                    },
                    menu: {
                        ...emptyClientState.menu,
                        cityView: {
                            ...emptyClientState.menu.cityView,
                            currentCityId: `city1`,
                        },
                    },
                };

                const item: ScheduledAttackOrderInfo = {
                    ...emptyScheduledAttackOrderState,
                    creationTime: `2000-01-01T01:00:00Z`,
                    minimumDelay: 160,
                    playerId    : `player1`,
                    targetCityId: `city2`,
                };

                const store = mockStore(
                    state,
                );

                const {
                    queryByText,
                } = render(
                    <Provider store={store}>
                        <CityOrdersScheduledAttackItemComponent
                            isActive={false}
                            item={item}
                        />
                    </Provider>,
                );

                expect(
                    queryByText(
                        `Attack Citytwo`,
                    ),
                )
                    .toBeInTheDocument();

                expect(
                    queryByText(
                        `in 1h 40m`,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

        test(
            `order not executed on time`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                    commonState: {
                        ...emptyCommonState,
                        cities: {
                            city2: {
                                ...emptyCityState,
                                name: `Citytwo`,
                            },
                        },
                        time: `2000-01-01T02:00:00Z`,
                    },
                    menu: {
                        ...emptyClientState.menu,
                        cityView: {
                            ...emptyClientState.menu.cityView,
                            currentCityId: `city1`,
                        },
                    },
                };

                const item: ScheduledAttackOrderInfo = {
                    ...emptyScheduledAttackOrderState,
                    creationTime: `2000-01-01T01:00:00Z`,
                    minimumDelay: 30,
                    playerId    : `player1`,
                    targetCityId: `city2`,
                };

                const store = mockStore(
                    state,
                );

                const {
                    queryByText,
                } = render(
                    <Provider store={store}>
                        <CityOrdersScheduledAttackItemComponent
                            isActive={false}
                            item={item}
                        />
                    </Provider>,
                );

                expect(
                    queryByText(
                        `Attack Citytwo`,
                    ),
                )
                    .toBeInTheDocument();

                expect(
                    queryByText(
                        `delayed by 30m`,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

    },
);
