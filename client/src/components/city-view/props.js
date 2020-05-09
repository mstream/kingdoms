// @flow

import {
    clientActions,
} from '../../pages/world/state/modules/actions';
import {
    clientStateSelectors,
} from '../../pages/world/state/modules/selectors';
import {
    connect,
} from 'react-redux';
import type {
    ActionCreatorsProps, StateToProps,
} from '../types';
import type {
    ClientAction, ClientState,
} from '../../pages/world/state/types';
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
): StateProps => {

    return Object.freeze(
        {
            city: clientStateSelectors.currentlyViewedCity(
                state,
            ),
            cityId: clientStateSelectors.menu.currentlyViewedCityId(
                state,
            ),
        },
    );

};

const actionCreators: DispatchProps = Object.freeze(
    {
        closeCityView: clientActions.menu.closeCityView,
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
