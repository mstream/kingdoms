// @flow

import type {
    CommonStateSelector,
} from '../../../../../../../common/src/state/modules/types';
import type {
    ClientState, ClientStateSelector,
} from '../../../../types';

export const createClientStateCommonStateSelector = <T>( {
    commonStateSelector,
}: {
    commonStateSelector: CommonStateSelector< T >,
}, ): ClientStateSelector< ?T > => {

    return (
        state: ClientState,
    ) => {

        if ( state.commonState == null ) {

            return null;

        }
        return commonStateSelector(
            state.commonState,
        );

    };

};
