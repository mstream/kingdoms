// @flow

import {
    clientActions,
} from '../../../../actions';
import {
    emptyClientState,
} from '../../../../../state';
import type {
    ClientRequestCityCreationAction,
} from '../../../common-state/actions/types';
import type {
    ClientStateMenuReducerTestScenario,
} from './types';

type Scenario = ClientStateMenuReducerTestScenario< ClientRequestCityCreationAction >;
type Scenarios = $ReadOnlyArray< Scenario >;

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
