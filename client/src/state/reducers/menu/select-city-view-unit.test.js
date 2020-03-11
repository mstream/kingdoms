// @flow

import { selectCityViewTab, selectCityViewUnit } from '../../actions';
import type { ClientState, ClientStateMenu } from '../../state';
import { emptyClientState, TAB_BUILDINGS, TAB_UNITS } from '../../state';
import { selectCityViewTabMenuReducer } from './select-city-view-tab';
import {
    UNIT_CATAPULT,
    UNIT_PEASANT, UNIT_SWORDMAN,
} from '../../../../../common/src/state/state';
import { selectCityViewUnitMenuReducer } from './select-city-view-unit';

describe('selectCityViewTabMenuReducer', () => {
    it('handles select city unit action', () => {
        const action = selectCityViewUnit({ unitType: UNIT_SWORDMAN });

        const previousGlobalState: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    unit: UNIT_CATAPULT,
                },
            },
        };

        const previousLocalState: ClientStateMenu = previousGlobalState.menu;

        const expected: ClientStateMenu = {
            ...previousLocalState,
            cityView: {
                ...previousLocalState.cityView,
                unit: UNIT_SWORDMAN,
            },
        };

        const actual = selectCityViewUnitMenuReducer({
            localState: previousLocalState,
            action,
            globalState: previousGlobalState,
        });

        expect(actual).toEqual(expected);
    });
});
