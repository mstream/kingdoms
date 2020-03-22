// @flow

import type { ClientAction } from '../../../../types';
import type { ClientStateReducerTestScenario } from '../../../types';
import type { ClientStateCamera } from '../types';

export type ClientStateCameraReducerTestScenario<+A: ClientAction> = ClientStateReducerTestScenario<ClientStateCamera, A>;