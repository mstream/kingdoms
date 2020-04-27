// @flow


import type {
    ScenarioContext, ScenarioExecution,
} from '../../types';

type Execution = ScenarioExecution< ScenarioContext, ScenarioContext >;

export const execution: Execution
    = async (
        {
            context,
        },
    ) => {

        return {
            ...context,
        };

    };
