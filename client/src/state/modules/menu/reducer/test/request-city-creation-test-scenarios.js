// @flow

import type {
    ClientStateMenu,

} from '../types';
import { emptyClientState } from '../../../types';
import type { ClientStateReducerTestScenario } from '../../../types';
import { requestCityCreation } from '../../../common-state/actions';
import type { ClientStateMenuReducerTestScenario } from './types';
import type { ClientRequestCityCreationAction } from '../../../common-state/actions/types';

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
