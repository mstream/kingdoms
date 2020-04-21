// @flow


import {
    appModel,
} from '../../models/app';
import {
    emptyCommonState,
} from '../../../../common/src/state/modules/state';
import {
    generateId,
} from '../../../../common/src/utils';
import {
    tools,
} from '../../tools';
import type {
    NewGameScenarioContext,
} from './types';
import type {
    ScenarioExecution,
} from '../types';

export const execution: ScenarioExecution< {||}, NewGameScenarioContext > = async ( {
    logger, t,
}, ) => {

    const worldId = generateId();

    await tools.createWorld(
        {
            id   : worldId,
            state: emptyCommonState,
        },
    );

    await appModel.actions.open(
        {
            logger,
            t,
            worldId,
        },
    );

    return {
        worldId,
    };

};
