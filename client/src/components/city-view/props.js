// @flow

import type {
    ActionCreatorsProps, StateToProps,
} from '../types';
import {
    connect,
} from 'react-redux';
import type {
    Dispatch,
} from 'redux';
import {
    clientStateSelectors,
} from '../../state/modules/selectors';
import type {
    ClientAction, ClientState,
} from '../../state/types';
import {
    clientActions,
} from '../../state/modules/actions';

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
