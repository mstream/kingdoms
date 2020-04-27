// @flow

import {
    getAll,
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
    DatabaseSetGetAllArgs, DatabaseSetGetAllResult,
} from './types';

type Args = DatabaseSetGetAllArgs< string >;
type Result = DatabaseSetGetAllResult< string >;

describe(
    `getAll`,
    () => {

        runDatabaseOperationTestScenarios<Args, Result>(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },
                operationFunction: getAll,
                scenarios        : [
                    scenario01,
                    scenario02,
                ],
            },
        );

    },
);
