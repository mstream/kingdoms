// @flow

import type { ClientStateMenuReducerTestScenario } from './types';
import type { ClientSelectCityViewOrdersTabAction } from '../../actions/types';
import { emptyClientState } from '../../../../../state';
import { clientActions } from '../../../../actions';

export const selectCityViewOrdersTabTestScenarios: $ReadOnlyArray<
    ClientStateMenuReducerTestScenario<ClientSelectCityViewOrdersTabAction>,
> = [
    {
        name: 'selects city view order',
        action: clientActions.menu.selectCityViewOrdersTab({
            orderId: 'order1',
        }),
        previousGlobalState: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    orderId: 'order2',
                },
            },
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
                cityView: {
                    ...previousLocalState.cityView,
                    orderId: 'order1',
                },
            };
        },
    },
];
