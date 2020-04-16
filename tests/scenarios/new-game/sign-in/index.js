// @flow


import {
    appModel,
} from '../../../models/app';
import {
    combineScenarios,
} from '../../utils';
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
            ...withValidCredentialsScenarios,
        ],
        parent: {
            execution,
            name,
            tags,
        },
    },
);
