// @flow

import {
    BUILDING_WAREHOUSE,
    RESOURCE_FOOD,
    UNIT_ARCHER,
    UNIT_CATAPULT,
    UNIT_KNIGHT,
    UNIT_NOBLE,
    UNIT_PEASANT,
    UNIT_PIKEMAN,
    UNIT_SWORDSMAN,
} from '../../../../../../../common/src/state/modules/rules/reducer/types';
import {
    CLOSE_ATTACK_VIEW,
    CLOSE_CITY_VIEW,
    OPEN_ATTACK_VIEW,
    OPEN_CITY_VIEW,
    SELECT_ATTACK_VIEW_ATTACKING_CITY,
    SELECT_CITY_VIEW_BUILDINGS_TAB,
    SELECT_CITY_VIEW_ORDERS_TAB,
    SELECT_CITY_VIEW_RESOURCES_TAB,
    SELECT_CITY_VIEW_TAB,
    SELECT_CITY_VIEW_UNITS_TAB,
    UPDATE_ATTACK_VIEW_MINIMUM_DELAY,
    UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE,
} from '../actions/types';
import {
    DUMMY,
} from '../../../actions/types';
import {
    REQUEST_CITY_CREATION,
    REQUEST_ORDER_CREATION,
    UPDATE_STATE,
} from '../../common-state/actions/types';
import {
    TAB_OVERVIEW,
} from './types';
import {
    clientActions,
} from '../../../actions';
import {
    closeAttackViewTestScenarios,
} from './_test/close-attack-view-test-scenarios';
import {
    closeCityViewTestScenarios,
} from './_test/close-city-view-test-scenarios';
import {
    emptyClientState,
} from '../../../../state';
import {
    menuReducer,
} from './index';
import {
    openAttackViewTestScenarios,
} from './_test/open-attack-view-test-scenarios';
import {
    openCityViewTestScenarios,
} from './_test/open-city-view-test-scenarios';
import {
    requestCityCreationTestScenarios,
} from './_test/request-city-creation-test-scenarios';
import {
    requestOrderCreationTestScenarios,
} from './_test/request-order-creation-test-scenarios';
import {
    runReducerTestScenarios,
} from '../../../../test-utils';
import {
    selectAttackViewAttackingCityTestScenarios,
} from './_test/select-attack-view-attacking-city-test-scenarios';
import {
    selectCityViewBuildingsTabTestScenarios,
} from './_test/select-city-view-buildings-tab-test-scenarios';
import {
    selectCityViewOrdersTabTestScenarios,
} from './_test/select-city-view-orders-tab-test-scenarios';
import {
    selectCityViewResourcesTabTestScenarios,
} from './_test/select-city-view-resources-tab-test-scenarios';
import {
    selectCityViewTabTestScenarios,
} from './_test/select-city-view-tab-test-scenarios';
import {
    selectCityViewUnitsTabTestScenarios,
} from './_test/select-city-view-units-tab-test-scenarios';
import {
    updateAttackViewMinimumDelayTestScenarios,
} from './_test/update-attack-view-minimum-delay-test-scenarios';
import {
    updateAttackViewRegimentTemplateTestScenarios,
} from './_test/update-attack-view-regiment-template-test-scenarios';
import {
    updateStateTestScenarios,
} from './_test/update-state-test-scenarios';
import type {
    ClientDummyAction,
} from '../../../actions/types';
import type {
    ClientStateMenuReducerTestScenario,
} from './_test/types';

const stateInitializationScenario: ClientStateMenuReducerTestScenario< ClientDummyAction > = {
    action                   : clientActions.global.dummy(),
    expectedLocalStateCreator: () => {

        return {
            attackView: {
                attackedCityId  : null,
                attackingCityId : null,
                isSubmitting    : false,
                minimumDelay    : 0,
                regimentTemplate: {
                    [ UNIT_ARCHER ]: {
                        from: 0,
                        to  : 0,
                    },
                    [ UNIT_CATAPULT ]: {
                        from: 0,
                        to  : 0,
                    },
                    [ UNIT_KNIGHT ]: {
                        from: 0,
                        to  : 0,
                    },
                    [ UNIT_NOBLE ]: {
                        from: 0,
                        to  : 0,
                    },
                    [ UNIT_PEASANT ]: {
                        from: 0,
                        to  : 0,
                    },
                    [ UNIT_PIKEMAN ]: {
                        from: 0,
                        to  : 0,
                    },
                    [ UNIT_SWORDSMAN ]: {
                        from: 0,
                        to  : 0,
                    },
                },
            },
            cityView: {
                building     : BUILDING_WAREHOUSE,
                currentCityId: null,
                orderId      : null,
                resource     : RESOURCE_FOOD,
                tab          : TAB_OVERVIEW,
                unit         : UNIT_PEASANT,
            },
            newCity: {
                isCityBeingCreated: false,
            },
        };

    },
    name               : `initializes its state`,
    previousGlobalState: {
        ...emptyClientState,

        // $FlowFixMe
        menu: undefined,
    },
};

describe(
    `menuReducer`,
    () => {

        runReducerTestScenarios(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },
                reducer   : menuReducer,
                reducerKey: `menu`,
                scenarios : {
                    [ CLOSE_ATTACK_VIEW ]: closeAttackViewTestScenarios,
                    [ CLOSE_CITY_VIEW ]                     : closeCityViewTestScenarios,
                    [ DUMMY ]            : [
                        stateInitializationScenario,
                    ],
                    [ OPEN_ATTACK_VIEW ]                    : openAttackViewTestScenarios,
                    [ OPEN_CITY_VIEW ]                      : openCityViewTestScenarios,
                    [ REQUEST_CITY_CREATION ]               : requestCityCreationTestScenarios,
                    [ REQUEST_ORDER_CREATION ]              : requestOrderCreationTestScenarios,
                    [ SELECT_ATTACK_VIEW_ATTACKING_CITY ]   : selectAttackViewAttackingCityTestScenarios,
                    [ SELECT_CITY_VIEW_BUILDINGS_TAB ]      : selectCityViewBuildingsTabTestScenarios,
                    [ SELECT_CITY_VIEW_ORDERS_TAB ]         : selectCityViewOrdersTabTestScenarios,
                    [ SELECT_CITY_VIEW_RESOURCES_TAB ]      : selectCityViewResourcesTabTestScenarios,
                    [ SELECT_CITY_VIEW_TAB ]                : selectCityViewTabTestScenarios,
                    [ SELECT_CITY_VIEW_UNITS_TAB ]          : selectCityViewUnitsTabTestScenarios,
                    [ UPDATE_ATTACK_VIEW_MINIMUM_DELAY ]    : updateAttackViewMinimumDelayTestScenarios,
                    [ UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE ]: updateAttackViewRegimentTemplateTestScenarios,
                    [ UPDATE_STATE ]                        : updateStateTestScenarios,
                },
            },
        );

    },
);
