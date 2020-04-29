// @flow

import type {
    CommonCreateScheduledAttackOrderAction,
} from '../../../../orders/actions/_children/creade-scheduled-attack-order/types';
import type {
    CommonStateCitiesReducerTestScenarios,
} from '../types';

export type Scenario =
    CommonStateCitiesReducerTestScenarios< CommonCreateScheduledAttackOrderAction >;

export type Scenarios = $ReadOnlyArray< Scenario >;
