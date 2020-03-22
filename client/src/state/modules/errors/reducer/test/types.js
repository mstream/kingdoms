// @flow

import type { ClientAction } from '../../../../types';
import type { ClientStateReducerTestScenario } from '../../../types';
import type { ClientStateErrors } from '../types';

export type ClientStateErrorsReducerTestScenario<+A: ClientAction> = ClientStateReducerTestScenario<ClientStateErrors, A>;