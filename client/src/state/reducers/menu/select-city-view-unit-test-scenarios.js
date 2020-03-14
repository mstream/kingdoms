// @flow

import type { ClientSelectCityViewUnitAction } from '../../actions';
import { selectCityViewUnit } from '../../actions';
import type { ClientStateMenu } from '../../state';
import { emptyClientState } from '../../state';
import { UNIT_CATAPULT, UNIT_SWORDMAN } from '../../../../../common/src/state';
import type { ClientStateReducerTestScenario } from '../root';

export const selectCityViewUnitTestScenarios: $ReadOnlyArray<ClientStateReducerTestScenario<ClientStateMenu, ClientSelectCityViewUnitAction>> = [
    {
        name: 'select city view unit',
        action: selectCityViewUnit({ unitType: UNIT_SWORDMAN }),
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
                    unit: UNIT_SWORDMAN,
                },
            };
        },
    },
];
