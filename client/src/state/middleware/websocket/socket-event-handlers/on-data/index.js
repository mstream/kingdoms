// @flow

import type {
    ServerResponse,
} from '../../../../../../../common/src/types';
import {
    parseServerResponse,
} from '../../../../../../../common/src/utils';
import {
    ABANDON_CITY,
    CHANGE_CITY_NAME,
    CREATE_CITY,
    UPGRADE_BUILDING,
} from '../../../../../../../common/src/state/modules/cities/actions/types';
import {
    CREATE_SCHEDULED_ATTACK_ORDER,
} from '../../../../../../../common/src/state/modules/orders/actions/types';
import {
    EXECUTE_TIME_STEP,
} from '../../../../../../../common/src/state/modules/time/actions';
import {
    DUMMY,
    GET_CURRENT_STATE,
    RESET_STATE,
} from '../../../../../../../common/src/state/actions/types';
import type {
    ClientStore,
} from '../../../../types';
import {
    clientActions,
} from '../../../../modules/actions';
import type {
    Logger,
} from '../../../../../../../common/src/logging/types';

type ServerResponseHandler = ( {
                                  serverResponse: ServerResponse,
                                  store: ClientStore,
                              } ) => void;

const handleAbandonCity: ServerResponseHandler = () => {
};

const handleDummy: ServerResponseHandler = () => {
};

const handleChangeCityName: ServerResponseHandler = () => {
};

const handlerCreateCity: ServerResponseHandler = () => {
};

const handlerCreateOrder: ServerResponseHandler = (
    {
        store,
    },
) => {

    store.dispatch(
        clientActions.menu.closeAttackView(),
    );

};

const handleGetCurrentState: ServerResponseHandler = () => {
};

const handleExecuteTimeStep: ServerResponseHandler = () => {
};

const handleResetStateStep: ServerResponseHandler = () => {
};

const handleUpgradeBuilding: ServerResponseHandler = () => {
};

const serverResponseHandlers = {
    [ ABANDON_CITY ]                 : handleAbandonCity,
    [ CHANGE_CITY_NAME ]             : handleChangeCityName,
    [ CREATE_CITY ]                  : handlerCreateCity,
    [ CREATE_SCHEDULED_ATTACK_ORDER ]: handlerCreateOrder,
    [ DUMMY ]                        : handleDummy,
    [ EXECUTE_TIME_STEP ]            : handleExecuteTimeStep,
    [ GET_CURRENT_STATE ]            : handleGetCurrentState,
    [ RESET_STATE ]                  : handleResetStateStep,
    [ UPGRADE_BUILDING ]             : handleUpgradeBuilding,
};

export const createOnDataHandler = (
    {
        logger,
        store,
    }: { logger: Logger, store: ClientStore },
) => {

    return (
        data: Buffer,
    ): void => {

        const dataString = data.toString();

        logger.info(
            `Websocket data received: %s`,
            dataString,
        );

        const serverResponse: ServerResponse = parseServerResponse(
            {
                json: dataString,
            },
        );

        const actionType = serverResponse.request.action.type;
        const serverResponseHandler = serverResponseHandlers[ actionType ];

        if ( serverResponseHandler == null ) {

            console.error(
                `unsupported response type received from server: ${ actionType }`,
            );

            return;

        }

        store.dispatch(
            clientActions.commonState.updateState(
                {
                    commonState: serverResponse.state,
                },
            ),
        );

        serverResponseHandler(
            {
                serverResponse,
                store,
            },
        );

    };

};
