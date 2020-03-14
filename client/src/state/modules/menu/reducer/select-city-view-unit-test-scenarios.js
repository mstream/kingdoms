// @flow

import type { ClientSelectCityViewUnitAction } from '../../../actions';
import { selectCityViewUnit } from '../../../actions';
import { UNIT_CATAPULT, UNIT_SWORDSMAN } from '../../../../../../common/src/state';
import type {
    ClientStateMenu,
    ClientStateMenuReducerTestScenario,
} from './types';
import { emptyClientState } from '../../types';
import type { ClientStateReducerTestScenario } from '../../types';

export const selectCityViewUnitTestScenarios: $ReadOnlyArray<ClientStateMenuReducerTestScenario<ClientSelectCityViewUnitAction>> = [
    {
        name: 'select city view unit',
        action: selectCityViewUnit({ unitType: UNIT_SWORDSMAN }),
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
