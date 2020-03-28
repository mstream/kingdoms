// @flow

import { TAB_BUILDINGS, TAB_UNITS } from '../types';
import type { ClientStateMenuReducerTestScenario } from './types';
import type { ClientSelectCityViewTabAction } from '../../actions/types';
import { emptyClientState } from '../../../../../state';
import { clientActions } from '../../../../actions';

export const selectCityViewTabTestScenarios: $ReadOnlyArray<ClientStateMenuReducerTestScenario<ClientSelectCityViewTabAction>> = [
    {
        name: 'selects city view tab',
        action: clientActions.menu.selectCityViewTab({
            tab: TAB_UNITS,
        }),
        previousGlobalState: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    tab: TAB_BUILDINGS,
                },
            },
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
                cityView: {
                    ...previousLocalState.cityView,
                    tab: TAB_UNITS,
                },
            };
        },
    },
];
