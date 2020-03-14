// @flow

import type {
    ClientStateMenu,
    ClientStateMenuReducerTestScenario,
} from './types';
import { TAB_BUILDINGS, TAB_UNITS } from './types';
import { emptyClientState } from '../../types';
import type { ClientSelectCityViewTabAction } from '../actions';
import { selectCityViewTab } from '../actions';

export const selectCityViewTabTestScenarios: $ReadOnlyArray<ClientStateMenuReducerTestScenario<ClientSelectCityViewTabAction>> = [
    {
        name: 'selects city view tab',
        action: selectCityViewTab({ tab: TAB_UNITS }),
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
