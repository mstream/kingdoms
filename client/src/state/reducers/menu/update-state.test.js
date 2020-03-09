// @flow

import { updateState } from '../../actions';
import {
    emptyCityState,
    emptyCommonstate,
} from '../../../../../common/src/state';
import type { ClientState, ClientStateMenu } from '../../state';
import { emptyClientState } from '../../state';
import { updateStateMenuReducer } from './update-state';

describe('updateStateMenuReducer', () => {
    it('handles update state event', () => {
        const commonState = {
            ...emptyCommonstate,
            cities: {
                '1': {
                    ...emptyCityState,
                    ownerId: 'player2',
                },
                '2': {
                    ...emptyCityState,
                    ownerId: 'player1',
                },
            },
        };

        const action = updateState({ commonState });

        const previousGlobalState: ClientState = {
            ...emptyClientState,
            camera: {
                ...emptyClientState.camera,
                geometry: {
                    ...emptyClientState.camera.geometry,
                    location: {
                        ...emptyClientState.camera.geometry.location,
                        x: 0,
                        y: 0,
                    },
                },
            },
            player: {
                name: 'player1',
            },
            commonState: {
                ...emptyCommonstate,
                cities: {
                    '1': {
                        ...emptyCityState,
                        ownerId: 'player2',
                    },
                },
            },
        };

        const previousLocalState: ClientStateMenu = previousGlobalState.menu;

        const expected: ClientStateMenu = {
            ...previousLocalState,
            newCity: {
                ...previousLocalState.newCity,
                isCityBeingCreated: false,
            },
        };

        const actual = updateStateMenuReducer({
            localState: previousLocalState,
            action,
            globalState: previousGlobalState,
        });

        expect(actual).toEqual(expected);
    });
});
