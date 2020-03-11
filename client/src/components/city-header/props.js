// @flow

import type { ClientState } from '../../state/state';
import type { ActionCreatorsProps, StateToProps } from '../types';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import type { ClientAction } from '../../state/actions';
import { openCityView, requestCityNameChange } from '../../state/actions';
import {
    currentlyViewedCityIdSelector,
    currentlyViewedCitySelector,
    nextCityIdSelector,
    previousCityIdSelector,
} from '../../state/selectors/client-state';

type OwnProps = {};

type StateProps = $ReadOnly<{
    ...StateToProps<typeof mapStateToProps>,
}>

type DispatchProps = $ReadOnly<{
    ...ActionCreatorsProps<typeof actionCreators>,
}>;

export type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const mapStateToProps = (state: ClientState) => {
    return Object.freeze({
        city: currentlyViewedCitySelector(state),
        cityId: currentlyViewedCityIdSelector(state),
        nextCityId: nextCityIdSelector(state),
        previousCityId: previousCityIdSelector(state),
    });
};

const actionCreators: DispatchProps = Object.freeze({
    openCityView,
    requestCityNameChange,
});

export const connectProps = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    actionCreators,
);