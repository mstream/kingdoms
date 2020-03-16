// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { CityBuildingsComponent } from './index';
import {
    BUILDING_PASTURE,
    BUILDING_WAREHOUSE,
    emptyCityState,
    emptyCommonState,
} from '../../../../../common/src/state';
import {
    TAB_BUILDINGS,
    TAB_UNITS,
} from '../../../state/modules/menu/reducer/types';
import { emptyClientState } from '../../../state/modules/types';
import type { ClientState } from '../../../state/modules/root';
import { selectCityViewBuildingsTab } from '../../../state/modules/menu/actions';

const mockStore = configureStore([]);


describe('CityResourcesComponent', () => {
    test('does not display when tab is not the buildings', async () => {
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
                <CityBuildingsComponent/>
            </Provider>,
        );

        await expect(queryByRole('tabpanel')).not.toBeInTheDocument();
    });

    test('does display when tab is the buildings', async () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: '1',
                    tab: TAB_BUILDINGS,
                    building: BUILDING_PASTURE,
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
                <CityBuildingsComponent/>
            </Provider>,
        );

        const warehouseTab = queryByText('Warehouse');

        if (warehouseTab == null) {
            throw Error('warehouse tab not found');
        }

        fireEvent.click(warehouseTab);

        const actions = store.getActions();

        expect(actions[0]).toEqual(selectCityViewBuildingsTab({ buildingType: BUILDING_WAREHOUSE }));
    });
});