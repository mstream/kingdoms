// @flow


import { UNIT_CATAPULT, UNIT_SWORDSMAN } from '../../../../../../common/src/state';
import type {
    ClientStateMenu,
    ClientStateMenuReducerTestScenario,
} from './types';
import { emptyClientState } from '../../types';
import type { ClientStateReducerTestScenario } from '../../types';
import type { ClientSelectCityViewUnitTabAction } from '../actions';
import { selectCityViewUnitTab } from '../actions';

export const selectCityViewUnitTabTestScenarios: $ReadOnlyArray<ClientStateMenuReducerTestScenario<ClientSelectCityViewUnitTabAction>> = [
    {
        name: 'select city view unit',
        action: selectCityViewUnitTab({ unitType: UNIT_SWORDSMAN }),
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
