// @flow


import type {
    ProxyEventValidator,
} from '../types';

export const validateGraphqlRequestEvent: ProxyEventValidator< $ReadOnly< {|
    query: string,
|} > > = (
    {
        event,
    },
) => {

    const {
        queryStringParameters,
    } = event;

    if ( queryStringParameters == null ) {

        return {
            errors: [
                `queryStringParameters are missing`,
            ],
        };

    }

    const {
        query,
    } = queryStringParameters;

    if ( query == null ) {

        return {
            errors: [
                `query is missing`,
            ],
        };

    }


    return {
        errors: [],
        result: {
            query,
        },
    };

};
