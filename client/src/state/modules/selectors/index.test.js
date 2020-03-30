// @flow

import { clientStateSelectors } from './index';
import { runClientStateSelectorsTestScenarios } from '../../utils';
import { cityIdsOwnedByPlayersSelectorTestScenarios } from './_test/city-ids-owned-by-player-test-scenarios';
import { currentlyViewedCitySelectorTestScenarios } from './_test/currently-viewed-city-test-scenarios';
import { isGameStartingSelectorTestScenarios } from './_test/is-game-starting-scenarios';
import { scheduledAttackOrdersForViewedCitySelectorTestScenarios } from './_test/scheduled-attack-orders-for-viewed-city-test-scenarios';
import { playerOwnsAnyCitySelectorTestScenarios } from './_test/player-owns-any-city-test-scenarios';
import { attackedCitySelectorTestScenarios } from './_test/attacked-city-test-scenarios';
import { attackingCitySelectorTestScenarios } from './_test/attacking-city-test-scenarios';
import { nextCityIdTestScenarios } from './_test/next-city-id-test-scenarios';
import { previousCityIdTestScenarios } from './_test/previous-city-id-test-scenarios';
import { distancesToAttackedCitySelectorTestScenarios } from './_test/distances-to-attacked-city-test-scenarios';


describe('clientStateSelectors', () => {
    runClientStateSelectorsTestScenarios({
        // $FlowFixMe
        moduleSelectors: clientStateSelectors,
        scenarios: {
            // $FlowFixMe
            attackedCity: attackedCitySelectorTestScenarios,
            // $FlowFixMe
            attackingCity: attackingCitySelectorTestScenarios,
            // $FlowFixMe
            cityIdsOwnedByPlayer: cityIdsOwnedByPlayersSelectorTestScenarios,
            // $FlowFixMe
            currentlyViewedCity: currentlyViewedCitySelectorTestScenarios,
            // $FlowFixMe
            distancesToAttackedCity: distancesToAttackedCitySelectorTestScenarios,
            // $FlowFixMe
            isGameStarting: isGameStartingSelectorTestScenarios,
            // $FlowFixMe
            nextCityId: nextCityIdTestScenarios,
            // $FlowFixMe
            playerOwnsAnyCity: playerOwnsAnyCitySelectorTestScenarios,
            // $FlowFixMe
            previousCityId: previousCityIdTestScenarios,
            // $FlowFixMe
            scheduledAttackOrdersForViewedCity: scheduledAttackOrdersForViewedCitySelectorTestScenarios,
        },
    });
});