// @flow

import {
    UNIT_PEASANT,
} from '../../../rules/reducer/types';
import {
    emptyCityState,
} from '../state';
import {
    emptyCommonState,
} from '../../../../state';
import {
    executeTimeStep,
} from '../../actions';
import {
    failure, success,
} from '../../../../utils';
import type {
    CommonExecuteTimeStepAction,
} from '../../../time/actions';
import type {
    CommonStateCitiesReducerTestScenarios,
} from './types';

type Scenarios = $ReadOnlyArray< CommonStateCitiesReducerTestScenarios< CommonExecuteTimeStepAction >, >;

export const executeTimeStepTestScenarios: Scenarios = [
    {
        action: executeTimeStep(
            {
                time: `2000-01-01T01:00:00Z`,
            },
        ),
        expectedReductionResultCreator: () => {

            return failure(
                {
                    errors: [
                        `the time from the action is not past the time from the state`,
                    ],
                },
            );

        },
        name               : `previous time newer than the one from action`,
        previousGlobalState: {
            ...emptyCommonState,
            time: `2000-01-01T02:00:00Z`,
        },
    },
    {
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
    },
];
