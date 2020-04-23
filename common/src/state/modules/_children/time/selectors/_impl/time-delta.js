// @flow

import {
    calculateTimeDeltaInSeconds,
} from '../../../../../../time';
import type {
    CommonState, CommonStateSelector,
} from '../../../../types';
import type {
    CommonStateTime,
} from '../../reducer/types';

type Props = $ReadOnly< {| time: CommonStateTime |} >;

export const timeDeltaInSecondsSelector: CommonStateSelector< number, Props >
    = (
        state: CommonState,
        props: Props,
    ) => {

        return calculateTimeDeltaInSeconds(
            {
                fromTime: state.time,
                toTime  : props.time,
            },
        );

    };

