// @flow


import type { ClientState, ClientStatePlayer } from '../../state';
import { emptyClientState } from '../../state';
import { loadPlayer, selectCityViewUnit } from '../../actions';
import { loadPlayerPlayerReducer } from './load-player';
import type { ClientStateMenuReducerTestScenario } from '../menu';
import type {
    ClientLoadPlayerAction,
    ClientSelectCityViewUnitAction,
} from '../../actions';
import { UNIT_CATAPULT, UNIT_SWORDSMAN } from '../../../../../common/src/state';
import type { ClientStatePlayerReducerTestScenario } from './index';


export const loadPlayerTestScenarios: $ReadOnlyArray<ClientStatePlayerReducerTestScenario<ClientLoadPlayerAction>> = [
    {
        name: 'select city view unit',
        action: loadPlayer({ name: 'player1' }),
        previousGlobalState: {
            ...emptyClientState,
            player: {
                ...emptyClientState.player,
                name: null,
            },
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
                name: 'player1',
            };
        },
    },
];
