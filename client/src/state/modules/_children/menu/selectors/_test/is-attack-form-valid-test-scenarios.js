// @flow

import {
    UNIT_ARCHER,
    UNIT_CATAPULT,
    UNIT_KNIGHT,
    UNIT_NOBLE,
    UNIT_PEASANT,
    UNIT_PIKEMAN,
    UNIT_SWORDSMAN,
} from '../../../../../../../../common/src/state/modules/_children/rules/reducer/types';
import {
    emptyClientState,
} from '../../../../../state';
import {
    emptyRange,
} from '../../../../../../../../common/src/range';
import type {
    ClientStateSelectorTestScenario,
} from '../../../../../types';

type Scenarios = $ReadOnlyArray< ClientStateSelectorTestScenario< boolean > >;

export const isAttackFormValidSelectorTestScenarios: Scenarios = [
    {
        expectedValue: false,
        name         : `false if attacking city is not selected`,
        state        : {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackingCityId : null,
                    regimentTemplate: {
                        ...emptyClientState.menu.attackView.regimentTemplate,
                        [ UNIT_PIKEMAN ]: {
                            from: 100,
                            to  : 200,
                        },
                    },
                },
            },
        },
    },
    {
        expectedValue: false,
        name         :
            `false when regiment template does could resolve into no single unit`,
        state: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackingCityId : `city1`,
                    regimentTemplate: {
                        [ UNIT_ARCHER ]: {
                            from: 0,
                            to  : 100,
                        },
                        [ UNIT_CATAPULT ] : emptyRange,
                        [ UNIT_KNIGHT ]   : emptyRange,
                        [ UNIT_NOBLE ]    : emptyRange,
                        [ UNIT_PEASANT ]  : emptyRange,
                        [ UNIT_PIKEMAN ]  : emptyRange,
                        [ UNIT_SWORDSMAN ]: emptyRange,
                    },
                },
            },
        },
    },
    {
        expectedValue: true,
        name         :
            `true if attacking city is selected and regiment template `
            + `would resolve into at least one unit`,
        state: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackingCityId : `city1`,
                    regimentTemplate: {
                        ...emptyClientState.menu.attackView.regimentTemplate,
                        [ UNIT_PIKEMAN ]: {
                            from: 1,
                            to  : 100,
                        },
                    },
                },
            },
        },
    },
];
