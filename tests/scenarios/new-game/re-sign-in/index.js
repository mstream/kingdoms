// @flow


import {
    appModel,
} from '../../../models/app';
import {
    combineScenarios,
} from '../../utils';
import {
    scenarios as withTokenWithInvalidSignatureScenarios,
} from './with-token-with-invalid-signature';
import {
    scenarios as withTokenWithoutUsernameScenarios,
} from './with-token-without-username';
import {
    scenarios as withUnparseableTokenScenarios,
} from './with-unparseable-token';

const name = `re-sign in`;
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
            ...withTokenWithInvalidSignatureScenarios,
            ...withTokenWithoutUsernameScenarios,
            ...withUnparseableTokenScenarios,
        ],
        parent: {
            execution,
            name,
            tags,
        },
    },
);
