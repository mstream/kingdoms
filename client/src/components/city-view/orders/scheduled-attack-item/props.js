// @flow

import {
    clientStateSelectors,
} from '../../../../state/modules/selectors';
import {
    connect,
} from 'react-redux';
import type {
    ClientAction, ClientState,
} from '../../../../state/types';
import type {
    CommonStateCities,
} from '../../../../../../common/src/state/modules/cities/reducer/types';
import type {
    Dispatch,
} from 'redux';
import type {
    ScheduledAttackOrderInfo,
} from '../../../../state/modules/selectors/types';

type OwnProps = $ReadOnly< {|
    isActive: boolean,
    item: ScheduledAttackOrderInfo,
|} >;

type StateProps = $ReadOnly< {|
    cities: ?CommonStateCities,
    cityId: ?string,
    time: ?string,
|} >;

type DispatchProps = $ReadOnly< {||} >;

export type Props = {|
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
|};

const mapStateToProps = (
    state: ClientState,
): StateProps => {

    return Object.freeze(
        {
            cities: clientStateSelectors.commonState.cities(
                state,
            ),
            cityId: clientStateSelectors.menu.currentlyViewedCityId(
                state,
            ),
            time: clientStateSelectors.commonState.time(
                state,
            ),
        },
    );

};

const actionCreators: DispatchProps = Object.freeze(
    {
    },
);

export const connectProps = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch< ClientAction >,
    >(
        mapStateToProps,

        // $FlowFixMe
        actionCreators,
    );
