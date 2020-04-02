// @flow

import type { ClientStateMenu } from '../types';
import type { ClientRequestOrderCreationAction } from '../../../common-state/actions/types';
import type { ClientStateActionReducer } from '../../../../../types';

type Reducer = ClientStateActionReducer<
    ClientStateMenu,
    ClientRequestOrderCreationAction,
>;

export const requestOrderCreationMenuReducer: Reducer = ({
    localState,
    action,
    globalState,
}) => {
    return {
        ...localState,
        attackView: {
            ...localState.attackView,
            isSubmitting: true,
        },
    };
};
