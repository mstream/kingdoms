// @flow

import type {
    ClientStateMenuReducerTestScenario,
} from './types';
import type {
    ClientRequestCityCreationAction,
} from '../../../common-state/actions/types';
import {
    emptyClientState,
} from '../../../../../state';
import {
    clientActions,
} from '../../../../actions';

type Scenarios = $ReadOnlyArray< ClientStateMenuReducerTestScenario< ClientRequestCityCreationAction >, >;

export const requestCityCreationTestScenarios: Scenarios = [
    {
        action: clientActions.commonState.requestCityCreation(
            {
                name: `Cityone`,
            },
        ),
        expectedLocalStateCreator: (
            {
                previousLocalState,
            },
        ) => {

            return {
                ...previousLocalState,
                newCity: {
                    ...previousLocalState.newCity,
                    isCityBeingCreated: true,
                },
            };

        },
        name               : `requests city creation`,
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
    },
];
