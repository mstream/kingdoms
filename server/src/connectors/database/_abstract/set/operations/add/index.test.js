// @flow

import {
    add,
} from './index';
import {
    runDatabaseOperationTestScenarios,
} from '../../../../utils';
import {
    scenario01,
} from './_test/scenario01';
import {
    scenario02,
} from './_test/scenario02';
import type {
    DatabaseSetAddArgs, DatabaseSetAddResult,
} from './types';

type Args = DatabaseSetAddArgs< string, string >;
type Result = DatabaseSetAddResult;

describe(
    `add`,
    () => {

        runDatabaseOperationTestScenarios<Args, Result>(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },
                operationFunction: add,
                scenarios        : [
                    scenario01,
                    scenario02,
                ],
            },
        );

    },
);
