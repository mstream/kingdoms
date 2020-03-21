// @flow

import { emptyClientState } from '../../types';
import type { ClientStateMenuReducerTestScenario } from './types';
import type { ClientCloseCityViewAction } from '../actions';
import { closeCityView } from '../actions';


export const closeCityViewTestScenarios: $ReadOnlyArray<ClientStateMenuReducerTestScenario<ClientCloseCityViewAction>> = [
    {
        name: 'closes city view',
        action: closeCityView(),
        previousGlobalState: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: 'city1',
                },
            },
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
                cityView: {
                    ...previousLocalState.cityView,
                    currentCityId: null,
                },
            };
        },
    },
];
