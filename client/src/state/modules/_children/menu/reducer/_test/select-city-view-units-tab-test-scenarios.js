// @flow

import {
    UNIT_CATAPULT,
    UNIT_SWORDSMAN,
} from '../../../../../../../../common/src/state/modules/rules/reducer/types';
import {
    clientActions,
} from '../../../../actions';
import {
    emptyClientState,
} from '../../../../../state';
import type {
    ClientSelectCityViewUnitsTabAction,
} from '../../actions/types';
import type {
    ClientStateMenuReducerTestScenario,
} from './types';

type Scenarios = $ReadOnlyArray< ClientStateMenuReducerTestScenario< ClientSelectCityViewUnitsTabAction >, >;

export const selectCityViewUnitsTabTestScenarios: Scenarios = [
    {
        action: clientActions.menu.selectCityViewUnitsTab(
            {
                unitType: UNIT_SWORDSMAN,
            },
        ),
        expectedLocalStateCreator: (
            {
                previousLocalState,
            },
        ) => {

            return {
                ...previousLocalState,
                cityView: {
                    ...previousLocalState.cityView,
                    unit: UNIT_SWORDSMAN,
                },
            };

        },
        name               : `select city view unit`,
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
    },
];
