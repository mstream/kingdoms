// @flow

import type {
    ServerAction,
    ServerResetStateAction
} from '../../../../../common/src/actions';
import type {CommonStateReducerResult} from '../root';
import {success} from '../root';
import {initialCommonState} from '../../index';
import type { CommonState, CommonStateCities } from '../../index';

export const unsupportedActionCitiesReducer = ({action, state}: { action: ServerAction, state: CommonState }): CommonStateReducerResult<CommonStateCities> => {
    return success({state: state.cities});
};
