// @flow

import {
    commonStateTimeSelectors,
} from '../../../../../../../../common/src/state/modules/time/selectors';
import {
    createClientStateCommonStateSelector,
} from '../utils';
import type {
    ClientStateSelector,
} from '../../../../../types';
import type {
    CommonStateTime,
} from '../../../../../../../../common/src/state/modules/time/reducer/types';

export const timeSelector: ClientStateSelector< ?CommonStateTime > = createClientStateCommonStateSelector(
    {
        commonStateSelector: commonStateTimeSelectors.time,
    },
);
