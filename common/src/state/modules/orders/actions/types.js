// @flow

import type { CommonStateRegimentTemplate } from '../reducer/types';
import type { BaseAction } from '../../../../types/actions';


export const CREATE_ORDER: 'CREATE_ORDER' = 'CREATE_ORDER';

type Payload = $ReadOnly<{
    minimumDelay: number,
    orderId: string,
    originCityId: string,
    playerId: string,
    regimentTemplate: CommonStateRegimentTemplate,
    targetCityId: string,
}>;

export type CommonCreateOrderAction = BaseAction<typeof CREATE_ORDER, Payload>;
