// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { CityResourcesComponent } from './index';
import { TAB_RESOURCES, TAB_UNITS } from '../../../state/modules/_children/menu/reducer/types';
import {
    RESOURCE_FOOD,
    RESOURCE_WOOD,
} from '../../../../../common/src/state/modules/rules/reducer/types';
import { emptyCommonState } from '../../../../../common/src/state/modules/state';
import { emptyCityState } from '../../../../../common/src/state/modules/cities/reducer/state';
import { emptyClientState } from '../../../state/state';
import type { ClientState } from '../../../state/types';
import { clientActions } from '../../../state/modules/actions';

const mockStore = configureStore([]);


describe('CityResourcesComponent', () => {
    test('does not display when tab is not the resources', async () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: 'city1',
                    tab: TAB_UNITS,
                },
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    'city1': {
                        ...emptyCityState,
                    },
                },
            },
        };

        const store = mockStore(state);

        const { queryByRole } = render(
            <Provider store={store}>
                <CityResourcesComponent/>
            </Provider>,
        );

        await expect(queryByRole('tabpanel')).not.toBeInTheDocument();
    });

    test('switches to food view after clicking the wood tab', async () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: 'city1',
                    tab: TAB_RESOURCES,
                    resource: RESOURCE_WOOD,
                },
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    'city1': {
                        ...emptyCityState,
                    },
                },
            },
        };

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <CityResourcesComponent/>
            </Provider>,
        );

        const foodTab = queryByText('Food');

        if (foodTab == null) {
            throw Error('food tab not found');
        }

        fireEvent.click(foodTab);

        const actions = store.getActions();

        expect(actions[0]).toEqual(clientActions.menu.selectCityViewResourcesTab({
            resourceType: RESOURCE_FOOD
        }));
    });
});