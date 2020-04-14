// @flow

import type {
    ClientStateMenuReducerTestScenario,
} from './types';
import type {
    ClientCloseCityViewAction,
} from '../../actions/types';
import {
    emptyClientState,
} from '../../../../../state';
import {
    clientActions,
} from '../../../../actions';

export const closeCityViewTestScenarios: $ReadOnlyArray< ClientStateMenuReducerTestScenario< ClientCloseCityViewAction >, > = [
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
