// @flow


import type {
    ClientStateMenu,
    ClientStateMenuReducerTestScenario,
} from './types';
import { emptyClientState } from '../../types';
import type { ClientStateReducerTestScenario } from '../../types';
import type { ClientSelectCityViewUnitsTabAction } from '../actions';
import { selectCityViewUnitsTab } from '../actions';
import {
    UNIT_CATAPULT,
    UNIT_SWORDSMAN,
} from '../../../../../../common/src/state/modules/rules/reducer/types';

export const selectCityViewUnitsTabTestScenarios: $ReadOnlyArray<ClientStateMenuReducerTestScenario<ClientSelectCityViewUnitsTabAction>> = [
    {
        name: 'select city view unit',
        action: selectCityViewUnitsTab({ unitType: UNIT_SWORDSMAN }),
        previousGlobalState: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    unit: UNIT_CATAPULT,
                },
            },
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
                cityView: {
                    ...previousLocalState.cityView,
                    unit: UNIT_SWORDSMAN,
                },
            };
        },
    },
];
