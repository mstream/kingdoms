/**
 * @flow
 */

export type DummyAction = {
    type: 'STATE_RESET'
}

export type StateUpdatedAction = {
    type: 'STATE_UPDATED',
    payload: string
};

export type ServerAction = DummyAction | StateUpdatedAction;

export const resetState = (): DummyAction => {
    return {
        type: 'STATE_RESET'
    };
};

export const updateState = ({time}: { time: string }): StateUpdatedAction => {
    return {
        type: 'STATE_UPDATED',
        payload: time
    };
};
