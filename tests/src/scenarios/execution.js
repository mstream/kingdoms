// @flow


import type {
    ScenarioContext, ScenarioExecution,
} from './types';

export const execution: ScenarioExecution< ScenarioContext, ScenarioContext > = async (
    {
        context,
    },
) => {

    return {
        ...context,
    };

};
