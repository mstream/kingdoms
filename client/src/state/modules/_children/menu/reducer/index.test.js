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
} from '../../../../../../../common/src/state/modules/_children/rules/reducer/types';
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
    closeAttackViewScenarios,
} from './_test/close-attack-view-scenarios';
import {
    closeCityViewScenarios,
} from './_test/close-city-view-scenarios';
import {
    emptyClientState,
} from '../../../../state';
import {
    generateTests,
} from '../../../../test-utils';
import {
    menuReducer,
} from './index';
import {
    openAttackViewScenarios,
} from './_test/open-attack-view-scenarios';
import {
    openCityViewScenarios,
} from './_test/open-city-view-scenarios';
import {
    requestCityCreationScenarios,
} from './_test/request-city-creation-scenarios';
import {
    requestOrderCreationScenarios,
} from './_test/request-order-creation-scenarios';
import {
    selectAttackViewAttackingCityScenarios,
} from './_test/select-attack-view-attacking-city-scenarios';
import {
    selectCityViewBuildingsTabScenarios,
} from './_test/select-city-view-buildings-tab-scenarios';
import {
    selectCityViewOrdersTabScenarios,
} from './_test/select-city-view-orders-tab-scenarios';
import {
    selectCityViewResourcesTabScenarios,
} from './_test/select-city-view-resources-tab-scenarios';
import {
    selectCityViewTabScenarios,
} from './_test/select-city-view-tab-scenarios';
import {
    selectCityViewUnitsTabScenarios,
} from './_test/select-city-view-units-tab-scenarios';
import {
    updateAttackViewMinimumDelayScenarios,
} from './_test/update-attack-view-minimum-delay-scenarios';
import {
    updateAttackViewRegimentTemplateScenarios,
} from './_test/update-attack-view-regiment-template-scenarios';
import {
    updateStateTestScenarios,
} from './_test/update-state-test-scenarios';
import type {
    ClientDummyAction,
} from '../../../actions/types';
import type {
    ClientStateMenuReducerTestScenario,
} from './_test/types';

type StateInitializationScenario =
    ClientStateMenuReducerTestScenario< ClientDummyAction >;

const stateInitializationScenario: StateInitializationScenario = {
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

const scenarios = {
    [ CLOSE_ATTACK_VIEW ]: closeAttackViewScenarios,
    [ CLOSE_CITY_VIEW ]  : closeCityViewScenarios,
    [ DUMMY ]            : [
        stateInitializationScenario,
    ],
    [ OPEN_ATTACK_VIEW ]                    : openAttackViewScenarios,
    [ OPEN_CITY_VIEW ]                      : openCityViewScenarios,
    [ REQUEST_CITY_CREATION ]               : requestCityCreationScenarios,
    [ REQUEST_ORDER_CREATION ]              : requestOrderCreationScenarios,
    [ SELECT_ATTACK_VIEW_ATTACKING_CITY ]   : selectAttackViewAttackingCityScenarios,
    [ SELECT_CITY_VIEW_BUILDINGS_TAB ]      : selectCityViewBuildingsTabScenarios,
    [ SELECT_CITY_VIEW_ORDERS_TAB ]         : selectCityViewOrdersTabScenarios,
    [ SELECT_CITY_VIEW_RESOURCES_TAB ]      : selectCityViewResourcesTabScenarios,
    [ SELECT_CITY_VIEW_TAB ]                : selectCityViewTabScenarios,
    [ SELECT_CITY_VIEW_UNITS_TAB ]          : selectCityViewUnitsTabScenarios,
    [ UPDATE_ATTACK_VIEW_MINIMUM_DELAY ]    : updateAttackViewMinimumDelayScenarios,
    [ UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE ]: updateAttackViewRegimentTemplateScenarios,
    [ UPDATE_STATE ]                        : updateStateTestScenarios,
};

describe(
    `menuReducer`,
    () => {

        generateTests(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },
                reducer   : menuReducer,
                reducerKey: `menu`,
                scenarios,
            },
        );

    },
);
