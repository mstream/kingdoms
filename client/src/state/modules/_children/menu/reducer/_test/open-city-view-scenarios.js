// @flow

import {
    clientActions,
} from '../../../../actions';
import {
    emptyCityState,
} from '../../../../../../../../common/src/state/modules/_children/cities/reducer/state';
import {
    emptyClientState,
} from '../../../../../state';
import {
    emptyCommonState,
} from '../../../../../../../../common/src/state/modules/state';
import type {
    ClientOpenCityViewAction,
} from '../../actions/types';
import type {
    ClientStateMenuReducerTestScenario,
} from './types';

type Scenario = ClientStateMenuReducerTestScenario< ClientOpenCityViewAction >;
type Scenarios = $ReadOnlyArray< Scenario >;

export const openCityViewScenarios: Scenarios = [
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
