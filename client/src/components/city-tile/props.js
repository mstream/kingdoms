// @flow

import type { ClientState, ClientStateTile } from '../../state/state';
import type { ActionCreatorsProps, StateToProps } from '../types';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import type { ClientAction } from '../../state/actions';
import { openCityView, requestCityNameChange } from '../../state/actions';
import type { Node } from 'react';
import {
    currentlyViewedCityIdSelector,
    currentlyViewedCitySelector,
    nextCityIdSelector,
    previousCityIdSelector,
} from '../../state/selectors/client-state';
import type { CommonStateCity } from '../../../../common/src/state/state';

type OwnProps = {
    city: CommonStateCity,
    cityTile: ClientStateTile,
    cityId: string,
};

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
    return Object.freeze({});
};

const actionCreators: DispatchProps = Object.freeze({
    openCityView,
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