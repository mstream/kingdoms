/**
 * @flow
 */

export type DummyAction = {
    type: 'DUMMY'
}

export type StateUpdateScheduledAction = {
    type: 'STATE_UPDATE_SCHEDULED',
    payload: string
};

export type ServerAction = DummyAction | StateUpdateScheduledAction;

export const dummy = (): DummyAction => {
    return {
        type: 'DUMMY'
    };
};

export const scheduleStateUpdate = ({time}: { time: string }): StateUpdateScheduledAction => {
    return {
        type: 'STATE_UPDATE_SCHEDULED',
        payload: time
    };
};
