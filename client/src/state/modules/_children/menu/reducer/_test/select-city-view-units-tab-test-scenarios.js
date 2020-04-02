// @flow

import {
    UNIT_CATAPULT,
    UNIT_SWORDSMAN,
} from '../../../../../../../../common/src/state/modules/rules/reducer/types';
import type { ClientStateMenuReducerTestScenario } from './types';
import type { ClientSelectCityViewUnitsTabAction } from '../../actions/types';
import { emptyClientState } from '../../../../../state';
import { clientActions } from '../../../../actions';

export const selectCityViewUnitsTabTestScenarios: $ReadOnlyArray<
    ClientStateMenuReducerTestScenario<ClientSelectCityViewUnitsTabAction>,
> = [
    {
        name: 'select city view unit',
        action: clientActions.menu.selectCityViewUnitsTab({
            unitType: UNIT_SWORDSMAN,
        }),
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
