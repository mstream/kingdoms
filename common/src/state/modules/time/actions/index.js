// @flow

import type {
    BaseAction,
} from '../../../../types/actions';

export const EXECUTE_TIME_STEP: 'EXECUTE_TIME_STEP' = `EXECUTE_TIME_STEP`;

export type CommonExecuteTimeStepAction = BaseAction< typeof EXECUTE_TIME_STEP,
    { time: string }, >;
