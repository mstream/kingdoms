// @flow

import globals from '../globals';


const env = process.env.NODE_ENV;

if (env == null) {
    throw Error(`missing NODE_ENV environmental variable`);
}

const globalVariablesCreators = {
    dev: globals.createDevVariables,
    prod: globals.createProdVariables,
};

const globalVariablesCreator = globalVariablesCreators[env];

if (globalVariablesCreator == null) {
    throw Error(`unsupported environment '${env}'`);
}

const globalVariables = globalVariablesCreator();


export const config = {
    ...globalVariables,
    credentials: {
        password: 'Test_123',
        username: 'test1',
    },
};
