// @flow

import {
    appModel,
} from '../../../../../models/app';
import {
    authModel,
} from '../../../../../models/auth';
import {
    combineScenarios,
} from '../../../../utils';


const name = `sign out`;
const tags = [
    `positive`,
];

const execution = async ( {
    t,
}, ) => {

    await appModel.actions.signOut(
        {
            t,
        },
    );

    await authModel.expectations.gotRedirectedFromAppToAuth(
        {
            action: `login`,
            t,
        },
    );

};


export const scenarios = combineScenarios(
    {
        children: [],
        parent  : {
            execution,
            name,
            tags,
        },
    },
);
