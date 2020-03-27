// @flow

import type { ClientAction } from '../../../../types';
import type { ClientStateReducerTestScenario } from '../../../types';
import type { ClientStateTiles } from '../types';

export type ClientStateTilesReducerTestScenario<+A: ClientAction> = ClientStateReducerTestScenario<ClientStateTiles, A>;