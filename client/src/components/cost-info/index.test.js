// @flow

import '@testing-library/jest-dom/extend-expect';
import {
    CostInfoComponent,
} from '.';
import {
    Provider,
} from 'react-redux';
import {
    RESOURCE_FOOD,
    RESOURCE_WOOD,
} from '../../../../common/src/state/modules/_children/rules/reducer/types';
import {
    emptyClientState,
} from '../../state/state';
import {
    emptyResourcesState,
} from '../../../../common/src/state/modules/_children/rules/reducer/state';
import {
    render,
} from '@testing-library/react';
import React from 'react';
import configureStore from 'redux-mock-store';
import type {
    ClientState,
} from '../../state/types';
import type {
    CommonStateResources,
} from '../../../../common/src/state/modules/_children/rules/reducer/types';

const mockStore = configureStore(
    [],
);

describe(
    `CostInfoComponent`,
    () => {

        test(
            `bla bla bla`,
            async () => {

                const availableResources: CommonStateResources = {
                    ...emptyResourcesState,
                    [ RESOURCE_FOOD ]: 100,
                    [ RESOURCE_WOOD ]: 20000,
                };

                const requiredResources: CommonStateResources = {
                    ...emptyResourcesState,
                    [ RESOURCE_FOOD ]: 200,
                    [ RESOURCE_WOOD ]: 10000,
                };

                const state: ClientState = {
                    ...emptyClientState,
                };

                const store = mockStore(
                    state,
                );

                const {
                    queryByText,
                } = render(
                    <Provider store={store}>
                        <CostInfoComponent
                            availableResources={availableResources}
                            requiredResources={requiredResources}
                        />
                    </Provider>,
                );

                await expect(
                    queryByText(
                        /RESOURCE_FOOD/,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByText(
                        /200/,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByText(
                        /RESOURCE_WOOD/,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByText(
                        /10k/,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

    },
);
