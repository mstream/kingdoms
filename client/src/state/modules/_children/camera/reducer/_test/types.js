// @flow

import type {
    ClientAction,
    ClientStateReducerTestScenario,
} from '../../../../../types';
import type { ClientStateCamera } from '../types';

export type ClientStateCameraReducerTestScenario<
    +A: ClientAction,
> = ClientStateReducerTestScenario<ClientStateCamera, A>;
