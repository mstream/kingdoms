// @flow


import {
    remove,
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
    DatabaseValueRemoveArgs,
    DatabaseValueRemoveResult,
} from './types';

type Args = DatabaseValueRemoveArgs< string >;
type Result = DatabaseValueRemoveResult;

describe(
    `get`,
    () => {

        runDatabaseOperationTestScenarios<Args, Result>(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },
                operationFunction: remove,
                scenarios        : [
                    scenario01,
                    scenario02,
                ],
            },
        );

    },
);
