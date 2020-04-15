// @flow

import {
    attackedCitySelectorTestScenarios,
} from './_test/attacked-city-test-scenarios';
import {
    attackingCitySelectorTestScenarios,
} from './_test/attacking-city-test-scenarios';
import {
    cityIdsOwnedByPlayersSelectorTestScenarios,
} from './_test/city-ids-owned-by-player-test-scenarios';
import {
    clientStateSelectors,
} from './index';
import {
    currentlyViewedCitySelectorTestScenarios,
} from './_test/currently-viewed-city-test-scenarios';
import {
    distancesToAttackedCitySelectorTestScenarios,
} from './_test/distances-to-attacked-city-test-scenarios';
import {
    isGameStartingSelectorTestScenarios,
} from './_test/is-game-starting-scenarios';
import {
    nextCityIdTestScenarios,
} from './_test/next-city-id-test-scenarios';
import {
    playerOwnsAnyCitySelectorTestScenarios,
} from './_test/player-owns-any-city-test-scenarios';
import {
    previousCityIdTestScenarios,
} from './_test/previous-city-id-test-scenarios';
import {
    runClientStateSelectorsTestScenarios,
} from '../../test-utils';
import {
    scheduledAttackOrdersForViewedCitySelectorTestScenarios,
} from './_test/scheduled-attack-orders-for-viewed-city-test-scenarios';

const scenarios = {
    attackedCity                      : attackedCitySelectorTestScenarios,
    attackingCity                     : attackingCitySelectorTestScenarios,
    cityIdsOwnedByPlayer              : cityIdsOwnedByPlayersSelectorTestScenarios,
    currentlyViewedCity               : currentlyViewedCitySelectorTestScenarios,
    distancesToAttackedCity           : distancesToAttackedCitySelectorTestScenarios,
    isGameStarting                    : isGameStartingSelectorTestScenarios,
    nextCityId                        : nextCityIdTestScenarios,
    playerOwnsAnyCity                 : playerOwnsAnyCitySelectorTestScenarios,
    previousCityId                    : previousCityIdTestScenarios,
    scheduledAttackOrdersForViewedCity: scheduledAttackOrdersForViewedCitySelectorTestScenarios,
};

describe(
    `clientStateSelectors`,
    () => {

        runClientStateSelectorsTestScenarios(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },

                // $FlowFixMe
                moduleSelectors: clientStateSelectors,

                // $FlowFixMe
                scenarios,
            },
        );

    },
);
