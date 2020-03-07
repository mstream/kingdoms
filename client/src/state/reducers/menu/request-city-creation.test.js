// @flow

import { updateStateMenuReducer } from './update-state';
import { requestCityCreation } from '../../actions';
import type { ClientState, ClientStateMenu } from '../../state';
import { emptyClientState } from '../../state';
import { requestCityCreationMenuReducer } from './request-city-creation';

describe('updateStateMenuReducer', () => {
    it('handles request city creation event', () => {
        const action = requestCityCreation({ name: 'Abc' });

        const previousGlobalState: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                newCity: {
                    ...emptyClientState.menu.newCity,
                    isCityBeingCreated: false,
                },
            },
        };

        const previousLocalState: ClientStateMenu = previousGlobalState.menu;

        const expected: ClientStateMenu = {
            ...previousLocalState,
            newCity: {
                ...previousLocalState.newCity,
                isCityBeingCreated: true,
            },
        };

        const actual = requestCityCreationMenuReducer({
            localState: previousLocalState,
            action,
            globalState: previousGlobalState,
        });

        expect(actual).toEqual(expected);
    });
});
