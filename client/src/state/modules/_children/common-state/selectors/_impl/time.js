// @flow

import {
    commonStateTimeSelectors,
} from '../../../../../../../../common/src/state/modules/_children/time/selectors';
import {
    createClientStateCommonStateSelector,
} from '../utils';
import type {
    ClientStateSelector,
} from '../../../../../types';
import type {
    CommonStateTime,
} from '../../../../../../../../common/src/state/modules/_children/time/reducer/types';

export const timeSelector: ClientStateSelector< ?CommonStateTime, void > = createClientStateCommonStateSelector(
    {
        commonStateSelector: commonStateTimeSelectors.time,
    },
);
