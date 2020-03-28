// @flow

import { TAB_OVERVIEW } from '../types';
import { emptyCommonState } from '../../../../../../../../common/src/state/modules/state';
import { emptyCityState } from '../../../../../../../../common/src/state/modules/cities/reducer/state';
import type { ClientStateMenuReducerTestScenario } from './types';
import type { ClientOpenCityViewAction } from '../../actions/types';
import { emptyClientState } from '../../../../../state';
import { clientActions } from '../../../../actions';

export const openCityViewTestScenarios: $ReadOnlyArray<ClientStateMenuReducerTestScenario<ClientOpenCityViewAction>> = [
    {
        name: 'opens city view',
        action: clientActions.menu.openCityView({
            cityId: 'city1'
        }),
        previousGlobalState: {
            ...emptyClientState,
            player: {
                name: 'player1',
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    'city1': {
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
                    currentCityId: 'city1',
                    tab: TAB_OVERVIEW,
                },
            };
        },
    },
];
