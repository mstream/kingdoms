// @flow

import { executeTimeStep } from '../../../actions';
import { executeTimeStepCitiesReducer } from '../reducer/execute-time-step';
import type {
    CommonStateCities,

} from '../reducer/types';
import { UNIT_PEASANT } from '../../rules/reducer/types';
import type {
    CommonState,
    CommonStateReducerResult,
} from '../../types';
import { failure, success } from '../../utils';
import { emptyCommonState } from '../../state';
import { emptyCityState } from '../reducer/state';
import type { CommonExecuteTimeStepAction } from '../../time/actions';
import type { CommonStateCitiesReducerTestScenarios } from './types';


export const executeTimeStepTestScenarios: $ReadOnlyArray<CommonStateCitiesReducerTestScenarios<CommonExecuteTimeStepAction>> = [
    {
        name: `previous time newer than the one from action`,
        action: executeTimeStep({ time: '2000-01-01T01:00:00Z' }),
        previousGlobalState: {
            ...emptyCommonState,
            time: '2000-01-01T02:00:00Z',
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return failure(
                {
                    errors: [`the time from the action is not past the time from the state`],
                },
            );
        },
    },
    {
        name: `empty city gains peasants because of migration`,
        action: executeTimeStep({ time: '2000-01-01T01:00:00Z' }),
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                '1': {
                    ...emptyCityState,
                    units: {
                        ...emptyCityState.units,
                        [UNIT_PEASANT]: 0,
                    },
                },
            },
            rules: {
                ...emptyCommonState.rules,
                baseCityCapacity: 1000,
                basePeasantsMigrationRate: 100,
                populationGrowthChangeRateCoefficient: 1,
                unitFoodDemand: 1,
                unitStarvingCoefficient: 1,
            },
            time: '2000-01-01T00:00:00Z',
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return success(
                {
                    state: {
                        ...previousLocalState,
                        '1': {
                            ...previousLocalState['1'],
                            units: {
                                ...previousLocalState['1'].units,
                                [UNIT_PEASANT]: 100,
                            },
                        },
                    },
                },
            );
        },
    },
];
