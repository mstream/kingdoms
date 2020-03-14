// @flow

import type { ClientCloseCityViewAction } from '../../actions';
import { closeCityView } from '../../actions';
import { emptyClientState } from '../types';
import type { ClientStateMenuReducerTestScenario } from './types';


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
                    currentCityId: '1',
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
