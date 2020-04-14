// @flow

import {
    createClientStateCommonStateSelector,
} from '../utils';
import type {
    ClientStateSelector,
} from '../../../../../types';
import type {
    CommonStateTime,
} from '../../../../../../../../common/src/state/modules/time/reducer/types';
import {
    commonStateTimeSelectors,
} from '../../../../../../../../common/src/state/modules/time/selectors';

export const timeSelector: ClientStateSelector< ?CommonStateTime > = createClientStateCommonStateSelector(
    {
        commonStateSelector: commonStateTimeSelectors.time,
    },
);
