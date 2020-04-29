// @flow


import {
    UNIT_PEASANT,
} from '../../../../../rules/reducer/types';
import {
    emptyCityState,
} from '../../../state';
import {
    emptyCommonState,
} from '../../../../../../state';
import {
    executeTimeStep,
} from '../../../../actions';
import {
    success,
} from '../../../../../../utils';
import type {
    Scenario,
} from '../types';


export const scenario02: Scenario = {
    action: executeTimeStep(
        {
            time: `2000-01-01T01:00:00Z`,
        },
    ),
    expectedReductionResultCreator: (
        {
            previousLocalState,
        },
    ) => {

        return success(
            {
                state: {
                    ...previousLocalState,
                    city1: {
                        ...previousLocalState[ `city1` ],
                        units: {
                            ...previousLocalState[ `city1` ].units,
                            [ UNIT_PEASANT ]: 100,
                        },
                    },
                },
            },
        );

    },
    name               : `empty city gains peasants because of migration`,
    previousGlobalState: {
        ...emptyCommonState,
        cities: {
            city1: {
                ...emptyCityState,
                units: {
                    ...emptyCityState.units,
                    [ UNIT_PEASANT ]: 0,
                },
            },
        },
        rules: {
            ...emptyCommonState.rules,
            baseCityCapacity                     : 1000,
            basePeasantsMigrationRate            : 100,
            gameSpeed                            : 1,
            populationGrowthChangeRateCoefficient: 1,
            unitFoodDemand                       : 1,
            unitStarvingCoefficient              : 1,
        },
        time: `2000-01-01T00:00:00Z`,
    },
};
