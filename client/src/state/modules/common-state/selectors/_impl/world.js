// @flow


import type { ClientStateSelector } from '../../../types';
import { createClientStateCommonStateSelector } from '../utils';
import type { CommonStateWorld } from '../../../../../../../common/src/state/modules/world/reducer/types';
import { commonStateWorldSelectors } from '../../../../../../../common/src/state/modules/world/selectors';

export const worldSelector: ClientStateSelector<?CommonStateWorld> =
    createClientStateCommonStateSelector({ commonStateSelector: commonStateWorldSelectors.world });