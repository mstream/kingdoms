// @flow

import type {
    SignInScenarioContext,
} from '../../types';

export type CreateCityScenarioContext = $ReadOnly< {|
    ...SignInScenarioContext,
    cityName: string,
|} >;
