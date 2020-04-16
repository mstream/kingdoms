// @flow

import {
    appModel,
} from '../../../../../models/app';

import {
    combineScenarios,
} from '../../../../utils';
import {
    generateCityName,
} from '../../../../../../common/src/utils';
import {
    selectors,
} from '../../../../../models/app/selectors';


const name = `create city`;
const tags = [
    `positive`,
];

const execution = async ( {
    t,
}, ) => {

    const cityName = generateCityName();

    await appModel.actions.createCity(
        {
            name: cityName,
            t,
        },
    );

    await t.expect(
        selectors
            .cityTile
            .textContent,
    )
        .contains(
            cityName,
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
