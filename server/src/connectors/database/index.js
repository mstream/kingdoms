// @flow

import { addConnection } from './add-connection';
import { casState } from './cas-state';
import { getConnections } from './get-connections';
import { getState } from './get-state';
import { setState } from './set-state';
import { removeConnection } from './remove-connection';

export const database = {
    addConnection,
    casState,
    getConnections,
    getState,
    removeConnection,
    setState,
};
