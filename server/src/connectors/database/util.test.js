// @flow

import { createStateKey } from './utils';

describe('createStateKey', () => {
    it('creates a valid key', async () => {
        const environment = 'env1';
        const worldId = 'world1';

        const expected = 'state:env1:world1';

        const actual = createStateKey({
            environment,
            worldId,
        });

        expect(actual).toEqual(expected);
    });
});
