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
    DatabaseSetRemoveArgs, DatabaseSetRemoveResult,
} from './types';


describe(
    `remove`,
    () => {

        runDatabaseOperationTestScenarios<DatabaseSetRemoveArgs< string, string >, DatabaseSetRemoveResult>(
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
