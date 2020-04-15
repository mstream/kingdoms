// @flow

import {
    cas,
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
import {
    scenario03,
} from './_test/scenario03';
import {
    scenario04,
} from './_test/scenario04';
import {
    scenario05,
} from './_test/scenario05';
import {
    scenario06,
} from './_test/scenario06';
import type {
    DatabaseValueCasArgs, DatabaseValueCasResult,
} from './types';

type Args = DatabaseValueCasArgs< string, string >;
type Result = DatabaseValueCasResult< string >;

describe(
    `cas`,
    () => {

        runDatabaseOperationTestScenarios<Args, Result>(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },
                operationFunction: cas,
                scenarios        : [
                    scenario01,
                    scenario02,
                    scenario03,
                    scenario04,
                    scenario05,
                    scenario06,
                ],
            },
        );

    },
);
