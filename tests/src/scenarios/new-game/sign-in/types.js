// @flow

import type {
    NewGameScenarioContext,
} from '../types';

export type SignInScenarioContext = $ReadOnly< {|
    ...NewGameScenarioContext,
    password: string,
    username: string,
|} >;
