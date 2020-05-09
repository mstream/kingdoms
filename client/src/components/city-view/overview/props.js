// @flow

import {
    TAB_OVERVIEW,
} from '../../../pages/world/state/modules/_children/menu/reducer/types';
import {
    clientStateSelectors,
} from '../../../pages/world/state/modules/selectors';
import {
    connect,
} from 'react-redux';
import type {
    ActionCreatorsProps, StateToProps,
} from '../../types';
import type {
    ClientAction, ClientState,
} from '../../../pages/world/state/types';
import type {
    Dispatch,
} from 'redux';

type OwnProps = {};

type StateProps = $ReadOnly< {
    ...StateToProps< typeof mapStateToProps >,
} >;

type DispatchProps = $ReadOnly< {
    ...ActionCreatorsProps< typeof actionCreators >,
} >;

export type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const mapStateToProps = (
    state: ClientState,
) => {

    return Object.freeze(
        {
            city: clientStateSelectors.currentlyViewedCity(
                state,
            ),
            isVisible: clientStateSelectors.menu.activeCityViewTab(
                state,
            ) === TAB_OVERVIEW,
            orderInfosById: clientStateSelectors.viewedCityScheduledAttackOrders(
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
        actionCreators,
    );
