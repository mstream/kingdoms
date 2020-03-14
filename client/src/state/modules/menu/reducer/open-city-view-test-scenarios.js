// @flow

import {
    emptyCityState,
    emptyCommonState,
} from '../../../../../../common/src/state';
import type { ClientStateMenuReducerTestScenario } from './types';
import { TAB_OVERVIEW } from './types';
import { emptyClientState } from '../../types';
import type { ClientOpenCityViewAction } from '../actions';
import { openCityView } from '../actions';

export const openCityViewTestScenarios: $ReadOnlyArray<ClientStateMenuReducerTestScenario<ClientOpenCityViewAction>> = [
    {
        name: 'opens city view',
        action: openCityView({ cityId: '1' }),
        previousGlobalState: {
            ...emptyClientState,
            player: {
                name: 'player1',
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    '1': {
                        ...emptyCityState,
                        ownerId: 'player1',
                    },
                },
            },
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: null,
                },
            },
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
                cityView: {
                    ...previousLocalState.cityView,
                    currentCityId: '1',
                    tab: TAB_OVERVIEW,
                },
            };
        },
    },
];
