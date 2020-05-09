// @flow

import type {
    ClientAction,
} from '../../../../types';
import type {
    CommonPlayerAction,
} from '../../../../../../../../../common/src/state/types';

export type ActionTransformer<+A: ClientAction, +B: CommonPlayerAction> = (
    $ReadOnly< {|
        clientAction: A,
        username: string
    |} >,
) => B;

