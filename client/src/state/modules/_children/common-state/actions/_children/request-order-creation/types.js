// @flow

import type {
    BaseAction,
} from '../../../../../../../../../common/src/types/actions';
import type {
    CommonStateRegimentTemplate,
} from '../../../../../../../../../common/src/state/modules/_children/orders/types';

export const REQUEST_ORDER_CREATION: 'REQUEST_ORDER_CREATION'
    = `REQUEST_ORDER_CREATION`;

export type ClientRequestOrderCreationAction =
    BaseAction< typeof REQUEST_ORDER_CREATION,
        $ReadOnly< {|
            minimumDelay: number,
            originCityId: string,
            regimentTemplate: CommonStateRegimentTemplate,
            targetCityId: string,
        |} >, >;
