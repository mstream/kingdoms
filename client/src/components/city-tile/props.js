// @flow

import type { ActionCreatorsProps, StateToProps } from '../types';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import type { ClientAction } from '../../state/actions';
import { openAttackView, openCityView } from '../../state/actions';
import type { CommonStateCity } from '../../../../common/src/state';
import { playerNameSelector } from '../../state/selectors';
import type { ClientStateTile } from '../../state/modules/tiles/types';
import type { ClientState } from '../../state/modules/root';

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
    return Object.freeze({
        playerName: playerNameSelector(state),
    });
};

const actionCreators: DispatchProps = Object.freeze({
    openAttackView,
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