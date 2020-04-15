// @flow

import type {
    DatabaseWorldsKey,
} from './types';
import type {
    KeyCreator,
} from '../../types';

export const createWorldsKey: KeyCreator< DatabaseWorldsKey > = (
    {
        key,
    },
) => {

    return `worlds:${ key.environment }`;

};
