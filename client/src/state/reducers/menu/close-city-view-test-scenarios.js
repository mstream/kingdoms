// @flow

import type { ClientCloseCityViewAction } from '../../actions';
import { closeCityView } from '../../actions';
import type { ClientStateMenu } from '../../state';
import { emptyClientState } from '../../state';
import type { ClientStateReducerTestScenario } from '../root';


export const closeCityViewTestScenarios: $ReadOnlyArray<ClientStateReducerTestScenario<ClientStateMenu, ClientCloseCityViewAction>> = [
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
