// @flow

import {
    REQUEST_WORLDS_UPDATE,
} from './modules/_children/worlds/actions/types';
import {
    call, put, takeEvery,
} from 'redux-saga/effects';
import {
    clientActions,
} from './modules/actions';
import {
    graphqlApi,
} from '../../../api/graphql';
import type {
    Config,
} from '../../../config/types';
import type {
    HttpClient,
} from '../../../clients/types';
import type {
    Logger,
} from '../../../../../common/src/logging/types';
import type {
    Saga,
} from 'redux-saga';


export const createSaga = (
    {
        config,
        httpClient,
        logger,
    }: $ReadOnly< {|
        config: Config,
        httpClient: HttpClient,
        logger: Logger,
    |} >,
) => {

    const updateWorlds = function* () {

        try {


            const worldIds: $ReadOnlyArray< string > = yield call(
                graphqlApi.fetchWorldIds,
                {
                    config,
                    httpClient,
                    logger,
                },
            );

            yield put(
                clientActions.worlds.succeedWorldsUpdate(
                    worldIds,
                ),
            );

        } catch ( error ) {

            console.error(
                error.stack,
            );

        }

    };

    const saga = function* (): Saga< void > {

        yield takeEvery(
            REQUEST_WORLDS_UPDATE,
            updateWorlds,
            {
                config,
                logger,
            },
        );

    };

    return saga;

};

