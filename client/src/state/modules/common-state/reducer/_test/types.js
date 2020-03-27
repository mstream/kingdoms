// @flow

import type { ClientAction } from '../../../../types';
import type { ClientStateReducerTestScenario } from '../../../types';
import type { ClientStateCommonState } from '../types';

export type ClientStateCommonStateReducerTestScenario<+A: ClientAction> = ClientStateReducerTestScenario<ClientStateCommonState, A>;