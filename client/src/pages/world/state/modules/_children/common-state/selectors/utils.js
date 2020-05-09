// @flow

import type {
    ClientState, ClientStateSelector,
} from '../../../../types';
import type {
    CommonStateSelector,
} from '../../../../../../../../../common/src/state/modules/types';

export const createClientStateCommonStateSelector = <T, P>( {
    commonStateSelector,
}: {
    commonStateSelector: CommonStateSelector< T, P >,
}, ): ClientStateSelector< ?T, P > => {

    return (
        state: ClientState,
        props: P,
    ) => {

        if ( state.commonState == null ) {

            return null;

        }

        return commonStateSelector(
            state.commonState,
            props,
        );

    };

};
