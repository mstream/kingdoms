// @flow

import {
    emptyCommonState,
} from '../../../../../../../../common/src/state/modules/state';
import {
    emptyCityState,
} from '../../../../../../../../common/src/state/modules/cities/reducer/state';
import type {
    ClientStateMenuReducerTestScenario,
} from './types';
import type {
    ClientOpenCityViewAction,
} from '../../actions/types';
import {
    emptyClientState,
} from '../../../../../state';
import {
    clientActions,
} from '../../../../actions';

export const openCityViewTestScenarios: $ReadOnlyArray< ClientStateMenuReducerTestScenario< ClientOpenCityViewAction >, > = [
    {
        action: clientActions.menu.openCityView(
            {
                cityId: `city1`,
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
                    currentCityId: `city1`,
                    orderId      : null,
                },
            };

        },
        name               : `opens city view`,
        previousGlobalState: {
            ...emptyClientState,
            commonState: {
                ...emptyCommonState,
                cities: {
                    city1: {
                        ...emptyCityState,
                        ownerId: `player1`,
                    },
                },
            },
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: `city2`,
                    orderId      : `order1`,
                },
            },
            player: {
                name: `player1`,
            },
        },
    },
];
