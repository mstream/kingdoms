// @flow

import type { ClientOpenCityViewAction } from '../../actions';
import { openCityView } from '../../actions';
import type { ClientStateMenu } from '../../state';
import { emptyClientState, TAB_OVERVIEW } from '../../state';
import {
    emptyCityState,
    emptyCommonState,
} from '../../../../../common/src/state';
import type { ClientStateReducerTestScenario } from '../root';

export const openCityViewTestScenarios: $ReadOnlyArray<ClientStateReducerTestScenario<ClientStateMenu, ClientOpenCityViewAction>> = [
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
