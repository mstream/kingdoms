// @flow

import type { ServerResponse } from '../../../../../../common/src/types';
import { parseServerResponse } from '../../../../../../common/src/util';
import {
    CHANGE_CITY_NAME,
    CREATE_CITY,
    UPGRADE_BUILDING,
} from '../../../../../../common/src/state/modules/cities/actions/types';
import { CREATE_ORDER } from '../../../../../../common/src/state/modules/orders/actions/types';
import { EXECUTE_TIME_STEP } from '../../../../../../common/src/state/modules/time/actions';
import { GET_CURRENT_STATE } from '../../../../../../common/src/state/actions/types';
import type { ClientStore } from '../../../types';
import { clientActions } from '../../../modules/actions';

export const createOnDataHandler = (
    {
        store,
    }: {
        store: ClientStore
    },
) => {
    return (data: Buffer): void => {
        const dataString = data.toString();

        console.log('ws data received: ' + dataString);

        const serverResponse: ServerResponse = parseServerResponse({ json: dataString });

        switch (serverResponse.request.type) {
            case CHANGE_CITY_NAME:
            case CREATE_CITY:
            case CREATE_ORDER:
            case GET_CURRENT_STATE:
            case EXECUTE_TIME_STEP:
            case UPGRADE_BUILDING: {
                store.dispatch(clientActions.commonState.updateState({
                    commonState: serverResponse.state
                }));
                return;
            }
            default: {
                console.error(
                    `unsupported response type received from server: ${serverResponse.request.type}`,
                );
            }
        }
    };
};
