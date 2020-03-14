// @flow

import type { ClientRequestCityCreationAction } from '../../actions';
import { requestCityCreation } from '../../actions';
import type { ClientStateMenu } from '../../state';
import { emptyClientState } from '../../state';
import type { ClientStateReducerTestScenario } from '../root';

export const requestCityCreationTestScenarios: $ReadOnlyArray<ClientStateReducerTestScenario<ClientStateMenu, ClientRequestCityCreationAction>> = [
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
