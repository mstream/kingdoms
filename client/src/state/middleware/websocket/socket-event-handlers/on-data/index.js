// @flow

import type { ServerResponse } from '../../../../../../../common/src/types';
import { parseServerResponse } from '../../../../../../../common/src/util';
import {
    ABANDON_CITY,
    CHANGE_CITY_NAME,
    CREATE_CITY,
    UPGRADE_BUILDING,
} from '../../../../../../../common/src/state/modules/cities/actions/types';
import { CREATE_SCHEDULED_ATTACK_ORDER } from '../../../../../../../common/src/state/modules/orders/actions/types';
import { EXECUTE_TIME_STEP } from '../../../../../../../common/src/state/modules/time/actions';
import {
    DUMMY,
    GET_CURRENT_STATE,
    RESET_STATE,
} from '../../../../../../../common/src/state/actions/types';
import type { ClientStore } from '../../../../types';
import { clientActions } from '../../../../modules/actions';

type ServerResponseHandler = ({ serverResponse: ServerResponse, store: ClientStore }) => void;

const handleAbandonCity: ServerResponseHandler = ({ serverResponse, store }) => {
};

const handleDummy: ServerResponseHandler = ({ serverResponse, store }) => {
};

const handleChangeCityName: ServerResponseHandler = ({ serverResponse, store }) => {
};

const handlerCreateCity: ServerResponseHandler = ({ serverResponse, store }) => {
};

const handlerCreateOrder: ServerResponseHandler = ({ serverResponse, store }) => {
    store.dispatch(clientActions.menu.closeAttackView());
};

const handleGetCurrentState: ServerResponseHandler = ({ serverResponse, store }) => {
};

const handleExecuteTimeStep: ServerResponseHandler = ({ serverResponse, store }) => {
};

const handleResetStateStep: ServerResponseHandler = ({ serverResponse, store }) => {
};

const handleUpgradeBuilding: ServerResponseHandler = ({ serverResponse, store }) => {
};

const serverResponseHandlers = {
    [ABANDON_CITY]: handleAbandonCity,
    [CHANGE_CITY_NAME]: handleChangeCityName,
    [CREATE_CITY]: handlerCreateCity,
    [CREATE_SCHEDULED_ATTACK_ORDER]: handlerCreateOrder,
    [DUMMY]: handleDummy,
    [GET_CURRENT_STATE]: handleGetCurrentState,
    [EXECUTE_TIME_STEP]: handleExecuteTimeStep,
    [RESET_STATE]: handleResetStateStep,
    [UPGRADE_BUILDING]: handleUpgradeBuilding,
};

export const createOnDataHandler = (
    {
        store,
    }: {
        store: ClientStore
    },
) => {
    return (data: Buffer): void => {
        const dataString = data.toString();

        console.info('ws data received: ' + dataString);

        const serverResponse: ServerResponse = parseServerResponse({ json: dataString });

        const serverResponseHandler = serverResponseHandlers[serverResponse.request.type];

        if (serverResponseHandler == null) {
            console.error(
                `unsupported response type received from server: ${serverResponse.request.type}`,
            );

            return;
        }

        store.dispatch(clientActions.commonState.updateState({
            commonState: serverResponse.state,
        }));

        serverResponseHandler({ serverResponse, store });
    };
};
