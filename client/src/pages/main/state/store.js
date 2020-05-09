// @flow

import {
    applyMiddleware, createStore,
} from 'redux';
import {
    clientActions,
} from './modules/actions';
import {
    composeWithDevTools,
} from 'redux-devtools-extension';
import {
    rootReducer,
} from './modules/reducer';
import createSagaMiddleware from 'redux-saga';
import type {
    ClientAction, ClientState, ClientStore,
} from './types';
import type {
    Config,
} from '../../../config/types';
import type {
    Dispatch,
} from 'redux';

import {
    createSaga,
} from './saga';
import type {
    HttpClient,
} from '../../../clients/types';
import type {
    Logger,
} from '../../../../../common/src/logging/types';

const composeEnhancers = composeWithDevTools(
    {
        trace: true,
    },
);

export const createClientStore = (
    {
        config,
        httpClient,
        logger,
    }: $ReadOnly< {|
        config: Config,
        httpClient: HttpClient,
        logger: Logger,
    |} >,
): ClientStore => {

    const sagaMiddleware = createSagaMiddleware();

    // $FlowFixMe
    const store = createStore<ClientState, ClientAction, Dispatch< ClientAction >>(
        rootReducer,
        composeEnhancers(
            applyMiddleware(
                sagaMiddleware,
            ),
        ),
    );

    const saga = createSaga(
        {
            config,
            httpClient,
            logger,
        },
    );

    sagaMiddleware.run(
        saga,
    );

    store.dispatch(
        clientActions.worlds.requestWorldsUpdate(),
    );

    return store;

};
