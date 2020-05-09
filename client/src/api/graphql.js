// @flow

import {
    ExecutionResultType,  WorldIdsResponseType,
} from './types';
import type {
    Config,
} from '../config/types';
import type {
    ExecutionResult,
} from 'graphql';
import type {
    HttpClient, HttpClientResponse,
} from '../clients/types';
import type {
    Logger,
} from '../../../common/src/logging/types';

const fetchWorldIds = async (
    {
        config,
        httpClient,
        logger,
    }: $ReadOnly< {|
        config: Config,
        httpClient: HttpClient,
        logger: Logger,
    |} >,
): Promise< $ReadOnlyArray< string > > => {

    const requestSpec = {
        method: `get`,
        params: {
            query: `{worldIds}`,
        },
        url: `${ config.httpApiUrl }/api/graphql`,
    };

    logger.debug(
        {
            interpolationValues: [
                requestSpec,
            ],
            message: `sending a request: %o`,
        },
    );

    const response: HttpClientResponse = await httpClient.request(
        requestSpec,
    );

    logger.debug(
        {
            interpolationValues: [
                response,
            ],
            message: `received a response: %o`,
        },
    );

    const executionResult: ExecutionResult = ExecutionResultType.assert(
        response.data,
    );

    const worldIdsResponse = WorldIdsResponseType.assert(
        executionResult.data,
    );

    return worldIdsResponse.worldIds;

};

export const graphqlApi = {
    fetchWorldIds,
};
