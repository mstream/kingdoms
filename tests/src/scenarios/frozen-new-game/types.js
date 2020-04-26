// @flow

import type {
    ScenarioContext,
} from '../types';

export type NewGameScenarioContext = $ReadOnly< {
    ...ScenarioContext,
    worldId: string,
} >;
