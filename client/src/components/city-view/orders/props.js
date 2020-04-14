// @flow

import {
    connect,
} from 'react-redux';
import type {
    Dispatch,
} from 'redux';
import {
    TAB_ORDERS,
} from '../../../state/modules/_children/menu/reducer/types';
import type {
    ClientAction, ClientState,
} from '../../../state/types';
import {
    clientStateSelectors,
} from '../../../state/modules/selectors';
import type {
    ScheduledAttackOrderInfosById,
} from '../../../state/modules/selectors/types';
import {
    clientActions,
} from '../../../state/modules/actions';

type OwnProps = $ReadOnly< {||} >;

type StateProps = $ReadOnly< {|
    activeOrderId: ?string,
    isVisible: boolean,
    orderInfosById: ?ScheduledAttackOrderInfosById,
|} >;

type DispatchProps = $ReadOnly< {|
    selectCityViewOrdersTab: typeof clientActions.menu.selectCityViewOrdersTab,
|} >;

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
            activeOrderId: clientStateSelectors.menu.activeCityViewOrderId(
                state,
            ),
            isVisible:
            clientStateSelectors.menu.activeCityViewTab(
                state,
            ) === TAB_ORDERS,
            orderInfosById: clientStateSelectors.scheduledAttackOrdersForViewedCity(
                state,
            ),
        },
    );

};

const actionCreators: DispatchProps = Object.freeze(
    {
        selectCityViewOrdersTab: clientActions.menu.selectCityViewOrdersTab,
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
