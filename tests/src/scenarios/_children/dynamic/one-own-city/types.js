// @flow

import type {
    ScenarioContext,
} from '../../../types';

export type OneOwnCityScenarioContext = $ReadOnly< {
    ...ScenarioContext,
    cityName: string,
    password: string,
    username: string,
    worldId: string,
} >;
