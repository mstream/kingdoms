// @flow

import type {
    ClientRequestCityCreationAction,
    ClientSelectCityViewUnitAction,
} from '../../actions';
import { requestCityCreation } from '../../actions';
import type {
    ClientStateMenu,
    ClientStateMenuReducerTestScenario,
} from './types';
import { emptyClientState } from '../types';
import type { ClientStateReducerTestScenario } from '../types';

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
