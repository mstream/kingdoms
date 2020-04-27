// @flow

import type {
    ScenarioContext,
} from '../../../types';

export type TwoOwnCitiesScenarioContext = $ReadOnly< {
    ...ScenarioContext,
    cityName1: string,
    cityName2: string,
    username: string,
    password: string,
    worldId: string,
} >;
