// @flow

import {
    attackedCityScenarios,
} from './_test/attacked-city-scenarios';
import {
    attackingCityScenarios,
} from './_test/attacking-city-scenarios';
import {
    cityIdsOwnedByPlayersScenarios,
} from './_test/city-ids-owned-by-player-scenarios';
import {
    clientStateSelectors,
} from './index';
import {
    currentlyViewedCityScenarios,
} from './_test/currently-viewed-city-scenarios';
import {
    distancesToAttackedCityScenarios,
} from './_test/distances-to-attacked-city-scenarios';
import {
    generateSelectorTests,
} from '../../test-utils';
import {
    isGameStartingScenarios,
} from './_test/is-game-starting-scenarios';
import {
    nextCityIdScenarios,
} from './_test/next-city-id-scenarios';
import {
    playerOwnsAnyCityScenarios,
} from './_test/player-owns-any-city-scenarios';
import {
    previousCityIdScenarios,
} from './_test/previous-city-id-scenarios';
import {
    viewedCityScheduledAttackOrdersScenarios,
} from './_test/viewed-city-scheduled-attack-orders-scenarios';

const scenarios = {
    attackedCity                   : attackedCityScenarios,
    attackingCity                  : attackingCityScenarios,
    cityIdsOwnedByPlayer           : cityIdsOwnedByPlayersScenarios,
    currentlyViewedCity            : currentlyViewedCityScenarios,
    distancesToAttackedCity        : distancesToAttackedCityScenarios,
    isGameStarting                 : isGameStartingScenarios,
    nextCityId                     : nextCityIdScenarios,
    playerOwnsAnyCity              : playerOwnsAnyCityScenarios,
    previousCityId                 : previousCityIdScenarios,
    viewedCityScheduledAttackOrders: viewedCityScheduledAttackOrdersScenarios,
};

describe(
    `clientStateSelectors`,
    () => {

        generateSelectorTests(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },

                // $FlowFixMe
                moduleSelectors: clientStateSelectors,
                scenarios,
            },
        );

    },
);
