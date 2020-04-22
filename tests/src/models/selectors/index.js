// @flow


import {
    Selector,
} from "testcafe";
import {
    generateSelectors,
} from './utils';
import {
    testIds,
} from '../../../../common/src/ui';
import type {
    ElementSelectors,
} from './types';

const app: ElementSelectors< $Keys< typeof testIds.app > > = generateSelectors(
    {
        ids: testIds.app,
    },
);

const attackView: ElementSelectors< $Keys< typeof testIds.attackView > > = generateSelectors(
    {
        ids: testIds.attackView,
    },
);

const auth = {
    passwordInput: Selector(
        `#signInFormPassword`,
    )
        .nth(
            1,
        ),
    signInButton: Selector(
        `input[type="submit"]`,
    )
        .nth(
            1,
        ),
    usernameInput: Selector(
        `#signInFormUsername`,
    )
        .nth(
            1,
        ),
};

const changeInfo: ElementSelectors< $Keys< typeof testIds.changeInfo > > = generateSelectors(
    {
        ids: testIds.changeInfo,
    },
);

const cityView: ElementSelectors< $Keys< typeof testIds.cityView > > = generateSelectors(
    {
        ids: testIds.cityView,
    },
);

const costInfo: ElementSelectors< $Keys< typeof testIds.costInfo > > = generateSelectors(
    {
        ids: testIds.costInfo,
    },
);

const errors: ElementSelectors< $Keys< typeof testIds.errors > > = generateSelectors(
    {
        ids: testIds.errors,
    },
);

const gameStart: ElementSelectors< $Keys< typeof testIds.gameStart > > = generateSelectors(
    {
        ids: testIds.gameStart,
    },
);

const image: ElementSelectors< $Keys< typeof testIds.image > > = generateSelectors(
    {
        ids: testIds.image,
    },
);

const loader: ElementSelectors< $Keys< typeof testIds.loader > > = generateSelectors(
    {
        ids: testIds.loader,
    },
);

const menu: ElementSelectors< $Keys< typeof testIds.menu > > = generateSelectors(
    {
        ids: testIds.menu,
    },
);

const worldMap: ElementSelectors< $Keys< typeof testIds.worldMap > > = generateSelectors(
    {
        ids: testIds.worldMap,
    },
);


export const selectors = {
    app,
    attackView,
    auth,
    changeInfo,
    cityView,
    costInfo,
    errors,
    gameStart,
    image,
    loader,
    menu,
    worldMap,
};
