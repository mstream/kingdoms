// @flow

import type {
    KeyCreator,
} from '../../types';
import type {
    DatabaseWorldsKey,
} from './types';

export const createWorldsKey: KeyCreator< DatabaseWorldsKey > = (
    {
        key,
    },
) => {

    return `worlds:${ key.environment }`;

};
