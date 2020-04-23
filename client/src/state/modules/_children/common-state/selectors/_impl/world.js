// @flow

import {
    commonStateWorldSelectors,
} from '../../../../../../../../common/src/state/modules/_children/world/selectors';
import {
    createClientStateCommonStateSelector,
} from '../utils';
import type {
    ClientStateSelector,
} from '../../../../../types';
import type {
    CommonStateWorld,
} from '../../../../../../../../common/src/state/modules/_children/world/reducer/types';

export const worldSelector: ClientStateSelector< ?CommonStateWorld, void >
    = createClientStateCommonStateSelector(
        {
            commonStateSelector: commonStateWorldSelectors.world,
        },
    );
