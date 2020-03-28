// @flow


import type { ActionCreatorsProps, StateToProps } from '../../types';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import type { ClientStateTile } from '../../../state/modules/_children/tiles/reducer/types';
import type { CommonStateCity } from '../../../../../common/src/state/modules/cities/reducer/types';
import type { ClientAction, ClientState } from '../../../state/types';
import { clientStatePlayerSelectors } from '../../../state/modules/_children/player/selectors';
import { clientActions } from '../../../state/modules/actions';

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
        playerName: clientStatePlayerSelectors.name(state),
    });
};

const actionCreators: DispatchProps = Object.freeze({
    openAttackView: clientActions.menu.openAttackView,
    openCityView: clientActions.menu.openCityView,
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