// @flow

import type {
    ClientSelectCityViewTabAction,
    ClientSelectCityViewUnitAction,
} from '../../actions';
import { selectCityViewTab } from '../../actions';
import type { ClientStateMenu } from '../../state';
import { emptyClientState, TAB_BUILDINGS, TAB_UNITS } from '../../state';
import type { ClientStateReducerTestScenario } from '../root';
import type { ClientStateMenuReducerTestScenario } from './index';

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
