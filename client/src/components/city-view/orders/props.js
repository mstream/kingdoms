// @flow

import {
    TAB_ORDERS,
} from '../../../pages/world/state/modules/_children/menu/reducer/types';
import {
    clientActions,
} from '../../../pages/world/state/modules/actions';
import {
    clientStateSelectors,
} from '../../../pages/world/state/modules/selectors';
import {
    connect,
} from 'react-redux';
import type {
    ClientAction, ClientState,
} from '../../../pages/world/state/types';
import type {
    Dispatch,
} from 'redux';
import type {
    ScheduledAttackOrderInfosById,
} from '../../../pages/world/state/modules/selectors/types';

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
            orderInfosById: clientStateSelectors.viewedCityScheduledAttackOrders(
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
