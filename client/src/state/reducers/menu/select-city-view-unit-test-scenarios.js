// @flow

import type { ClientSelectCityViewUnitAction } from '../../actions';
import { selectCityViewUnit } from '../../actions';
import type { ClientStateMenu } from '../../state';
import { emptyClientState } from '../../state';
import { UNIT_CATAPULT, UNIT_SWORDSMAN } from '../../../../../common/src/state';
import type { ClientStateReducerTestScenario } from '../root';
import type { ClientStateMenuReducerTestScenario } from './index';

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
