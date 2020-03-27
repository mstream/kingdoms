// @flow

import type { ClientAction } from '../../../../types';
import type { ClientStateReducerTestScenario } from '../../../types';
import type { ClientStateMenu } from '../types';

export type ClientStateMenuReducerTestScenario<+A: ClientAction> = ClientStateReducerTestScenario<ClientStateMenu, A>;