// @flow

import {
    commonStateWorldSelectors,
} from '../../../../../../../../common/src/state/modules/world/selectors';
import {
    createClientStateCommonStateSelector,
} from '../utils';
import type {
    ClientStateSelector,
} from '../../../../../types';
import type {
    CommonStateWorld,
} from '../../../../../../../../common/src/state/modules/world/reducer/types';

export const worldSelector: ClientStateSelector< ?CommonStateWorld > = createClientStateCommonStateSelector(
    {
        commonStateSelector: commonStateWorldSelectors.world,
    },
);
