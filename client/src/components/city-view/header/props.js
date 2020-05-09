// @flow

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
            cityId: clientStateSelectors.menu.currentlyViewedCityId(
                state,
            ),
            nextCityId: clientStateSelectors.nextCityId(
                state,
            ),
            previousCityId: clientStateSelectors.previousCityId(
                state,
            ),
        },
    );

};

const actionCreators: DispatchProps = Object.freeze(
    {
        openCityView         : clientActions.menu.openCityView,
        requestCityNameChange: clientActions.commonState.requestCityNameChange,
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
