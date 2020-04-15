// @flow

import {
    clientActions,
} from '../../../../actions';
import {
    emptyClientState,
} from '../../../../../state';
import type {
    ClientCloseCityViewAction,
} from '../../actions/types';
import type {
    ClientStateMenuReducerTestScenario,
} from './types';

type Scenarios = $ReadOnlyArray< ClientStateMenuReducerTestScenario< ClientCloseCityViewAction >, >;

export const closeCityViewTestScenarios: Scenarios = [
    {
        action                   : clientActions.menu.closeCityView(),
        expectedLocalStateCreator: (
            {
                previousLocalState,
            },
        ) => {

            return {
                ...previousLocalState,
                cityView: {
                    ...previousLocalState.cityView,
                    currentCityId: null,
                },
            };

        },
        name               : `closes city view`,
        previousGlobalState: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: `city1`,
                },
            },
        },
    },
];
