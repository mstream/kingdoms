// @flow

import type {
    CommonStateSelector,
} from '../../../../types';
import type {
    CommonStateWorld,
} from '../../reducer/types';


export const worldSelector: CommonStateSelector< CommonStateWorld, void > = (
    state,
) => {

    return state.world;

};
