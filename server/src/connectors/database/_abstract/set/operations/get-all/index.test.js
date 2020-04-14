// @flow

import {
    getAll,
} from './index';
import {
    runDatabaseOperationTestScenarios,
} from '../../../../utils';
import type {
    DatabaseSetGetAllArgs, DatabaseSetGetAllResult,
} from './types';
import {
    scenario01,
} from './_test/scenario01';
import {
    scenario02,
} from './_test/scenario02';

describe(
    `getAll`,
    () => {

        runDatabaseOperationTestScenarios<DatabaseSetGetAllArgs< string >, DatabaseSetGetAllResult< string >>(
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
