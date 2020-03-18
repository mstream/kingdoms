// @flow

import { upgradeBuilding } from '../../../actions';
import {
    BUILDING_PASTURE,
    RESOURCE_FOOD,
    RESOURCE_WOOD,
} from '../../rules/reducer/types';
import { failure, success } from '../../utils';
import { emptyCommonState } from '../../state';
import { emptyCityState } from '../reducer/state';
import type { CommonUpgradeBuildingAction } from '../actions';
import type { CommonStateCitiesReducerTestScenarios } from './types';


export const upgradeBuildingTestScenarios: $ReadOnlyArray<CommonStateCitiesReducerTestScenarios<CommonUpgradeBuildingAction>> = [
    {
        name: 'upgrades the building',
        action: upgradeBuilding({
            buildingType: BUILDING_PASTURE,
            cityId: '1',
            playerId: 'player1',
        }),
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                '1': {
                    ...emptyCityState,
                    ownerId: 'player1',
                    buildings: {
                        ...emptyCityState.buildings,
                        [BUILDING_PASTURE]: {
                            tier: 0,
                        },
                    },
                    resources: {
                        [RESOURCE_FOOD]: 400,
                        [RESOURCE_WOOD]: 300,
                    },
                },
            },
            rules: {
                ...emptyCommonState.rules,
                buildingUpgradeCosts: {
                    ...emptyCommonState.rules.buildingUpgradeCosts,
                    [BUILDING_PASTURE]: {
                        // $FlowFixMe
                        [RESOURCE_FOOD]: 200,
                        // $FlowFixMe
                        [RESOURCE_WOOD]: 200,
                    },
                },
            },
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return success(
                {
                    state:
                        {
                            ...previousLocalState,
                            '1': {
                                ...previousLocalState['1'],
                                buildings: {
                                    ...previousLocalState['1'].buildings,
                                    [BUILDING_PASTURE]: {
                                        ...previousLocalState['1'].buildings[BUILDING_PASTURE],
                                        tier: 1,
                                    },
                                },
                                resources: {
                                    ...previousLocalState['1'].resources,
                                    [RESOURCE_FOOD]: 200,
                                    [RESOURCE_WOOD]: 100,
                                },
                            },
                        },
                },
            );
        },
    },
    {
        name: 'fails when city does not exist',
        action: upgradeBuilding({
            buildingType: BUILDING_PASTURE,
            cityId: '1',
            playerId: 'player1',
        }),
        previousGlobalState: {
            ...emptyCommonState,
            cities: {},
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return failure(
                {
                    errors: ['the city does not exist'],
                },
            );
        },
    },
    {
        name: 'fails when city does not belong to the player',
        action: upgradeBuilding({
            buildingType: BUILDING_PASTURE,
            cityId: '1',
            playerId: 'player1',
        }),
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                '1': {
                    ...emptyCityState,
                    ownerId: 'player2',
                },
            },
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return failure(
                {
                    errors: ['the city does not belong to the player'],
                },
            );
        },
    },
    {
        name: 'fails when the resources are insufficient',
        action: upgradeBuilding({
            buildingType: BUILDING_PASTURE,
            cityId: '1',
            playerId: 'player1',
        }),
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                '1': {
                    ...emptyCityState,
                    ownerId: 'player1',
                    buildings: {
                        ...emptyCityState.buildings,
                        [BUILDING_PASTURE]: {
                            tier: 0,
                        },
                    },
                    resources: {
                        [RESOURCE_FOOD]: 100,
                        [RESOURCE_WOOD]: 100,
                    },
                },
            },
            rules: {
                ...emptyCommonState.rules,
                buildingUpgradeCosts: {
                    ...emptyCommonState.rules.buildingUpgradeCosts,
                    [BUILDING_PASTURE]: {
                        // $FlowFixMe
                        [RESOURCE_FOOD]: 200,
                        // $FlowFixMe
                        [RESOURCE_WOOD]: 200,
                    },
                },
            },
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return failure(
                {
                    errors: [
                        'insufficient RESOURCE_FOOD',
                        'insufficient RESOURCE_WOOD',
                    ],
                },
            );
        },
    },
];
