// @flow


import {
    runDatabaseOperationTestScenarios,
} from '../../../../utils';
import type {
    DatabaseValueGetArgs, DatabaseValueGetResult,
} from './types';
import {
    scenario01,
} from './_test/scenario01';
import {
    scenario02,
} from './_test/scenario02';
import {
    get,
} from '.';

describe(
    `get`,
    () => {

        runDatabaseOperationTestScenarios<DatabaseValueGetArgs< string >, DatabaseValueGetResult< string >>(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },
                operationFunction: get,
                scenarios        : [
                    scenario01,
                    scenario02,
                ],
            },
        );

    },
);
