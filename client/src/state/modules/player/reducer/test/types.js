// @flow

import type { ClientAction } from '../../../../types';
import type { ClientStateReducerTestScenario } from '../../../types';
import type { ClientStatePlayer } from '../types';

export type ClientStatePlayerReducerTestScenario<+A: ClientAction> = ClientStateReducerTestScenario<ClientStatePlayer, A>;