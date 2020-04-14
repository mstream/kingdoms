// @flow

import type {
    CommonStateSelector,
} from '../../../types';
import type {
    CommonStateWorld,
} from '../../reducer/types';

export const worldSelector: CommonStateSelector< CommonStateWorld > = (
    state,
) => {

    return state.world;

};
