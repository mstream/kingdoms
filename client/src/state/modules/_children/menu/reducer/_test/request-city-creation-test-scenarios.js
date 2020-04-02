// @flow

import type { ClientStateMenuReducerTestScenario } from './types';
import type { ClientRequestCityCreationAction } from '../../../common-state/actions/types';
import { emptyClientState } from '../../../../../state';
import { clientActions } from '../../../../actions';

export const requestCityCreationTestScenarios: $ReadOnlyArray<
    ClientStateMenuReducerTestScenario<ClientRequestCityCreationAction>,
> = [
    {
        name: 'requests city creation',
        action: clientActions.commonState.requestCityCreation({
            name: 'Cityone',
        }),
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
