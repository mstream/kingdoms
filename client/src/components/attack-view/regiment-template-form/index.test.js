// @flow

import '@testing-library/jest-dom/extend-expect';
import {
    AttackViewRegimentTemplateFormComponent,
} from '.';
import {
    Provider,
} from 'react-redux';
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
    emptyRegimentTemplateState,
} from '../../../../../common/src/state/modules/orders/reducer/state';
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
    `AttackViewRegimentTemplateFormComponent`,
    () => {

        test(
            `displays the attack form`,
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
                        attackView: {
                            ...emptyClientState.menu.attackView,
                            attackingCityId : `city1`,
                            regimentTemplate: {
                                ...emptyRegimentTemplateState,
                            },
                        },
                    },
                };

                const updateAttackViewRegimentTemplate = jest.fn();

                const store = mockStore(
                    state,
                );

                const {
                    queryByText,
                } = render(
                    <Provider store={store}>
                        <AttackViewRegimentTemplateFormComponent
                            updateAttackViewRegimentTemplate={
                                updateAttackViewRegimentTemplate
                            }
                        />
                    </Provider>,
                );

                await expect(
                    queryByText(
                        `Peasants`,
                    ),
                ).not.toBeInTheDocument();

                await expect(
                    queryByText(
                        `Pikemen`,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByText(
                        `Archers`,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByText(
                        `Swordsmen`,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByText(
                        `Knights`,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByText(
                        `Catapults`,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByText(
                        `Nobles`,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

    },
);
