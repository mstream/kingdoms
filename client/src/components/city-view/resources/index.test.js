// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { CityResourcesComponent } from './index';
import {
    emptyCityState,
    emptyCommonState,
     RESOURCE_FOOD,
      RESOURCE_WOOD,
} from '../../../../../common/src/state';
import { TAB_RESOURCES, TAB_UNITS } from '../../../state/modules/menu/reducer/types';
import { emptyClientState } from '../../../state/modules/types';
import type { ClientState } from '../../../state/modules/root';
import {
    selectCityViewResourcesTab,
    selectCityViewUnitsTab,
} from '../../../state/modules/menu/actions';

const mockStore = configureStore([]);


describe('CityResourcesComponent', () => {
    test('does not display when tab is not the resources', async () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: '1',
                    tab: TAB_UNITS,
                },
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    '1': {
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
                    currentCityId: '1',
                    tab: TAB_RESOURCES,
                    resource: RESOURCE_WOOD,
                },
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    '1': {
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

        expect(actions[0]).toEqual(selectCityViewResourcesTab({ resourceType: RESOURCE_FOOD }));
    });
});