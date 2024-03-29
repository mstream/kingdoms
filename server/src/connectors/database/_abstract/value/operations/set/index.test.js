// @flow

import {
    runDatabaseOperationTestScenarios,
} from '../../../../utils';
import {
    scenario01,
} from './_test/scenario01';
import {
    scenario02,
} from './_test/scenario02';
import {
    set,
} from '.';
import type {
    DatabaseValueSetArgs, DatabaseValueSetResult,
} from './types';

type Args = DatabaseValueSetArgs< string, string >;
type Result = DatabaseValueSetResult;

describe(
    `set`,
    () => {

        runDatabaseOperationTestScenarios<Args, Result>(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },
                operationFunction: set,
                scenarios        : [
                    scenario01,
                    scenario02,
                ],
            },
        );

    },
);
