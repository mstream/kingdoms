// @flow


import {
    appModel,
} from '../../../models/app';
import {
    combineScenarios,
} from '../../utils';
import {
    scenarios as withInvalidPasswordScenarios,
} from './with-invalid-password';
import {
    scenarios as withNonExistentUsernameScenarios,
} from './with-non-existent-username';
import {
    scenarios as withValidCredentialsScenarios,
} from './with-valid-credentials';
const name = `sign in`;
const tags = [
    `authentication`,
];

const execution = async ( {
    context, t,
}, ) => {

    const {
        worldId,
    } = context;

    await appModel.actions.open(
        {
            t,
            worldId,
        },
    );

};


export const scenarios = combineScenarios(
    {
        children: [
            ...withInvalidPasswordScenarios,
            ...withNonExistentUsernameScenarios,
            ...withValidCredentialsScenarios,
        ],
        parent: {
            execution,
            name,
            tags,
        },
    },
);
