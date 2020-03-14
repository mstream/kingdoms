// @flow

import type {
    ClientStateMenu,
    ClientStateMenuReducerTestScenario,
} from './types';
import { emptyClientState } from '../../types';
import type { ClientStateReducerTestScenario } from '../../types';
import type { ClientRequestCityCreationAction } from '../../common-state/actions';
import { requestCityCreation } from '../../common-state/actions';

export const requestCityCreationTestScenarios: $ReadOnlyArray<ClientStateMenuReducerTestScenario<ClientRequestCityCreationAction>> = [
    {
        name: 'requests city creation',
        action: requestCityCreation({ name: 'Cityone' }),
        previousGlobalState: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                newCity: {
                    ...emptyClientState.menu.newCity,
                    isCityBeingCreated: false,
                },
            },
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
                newCity: {
                    ...previousLocalState.newCity,
                    isCityBeingCreated: true,
                },
            };
        },
    },
];
