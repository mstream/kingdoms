// @flow

import type { ActionCreatorsProps, StateToProps } from '../types';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import type { ClientAction } from '../../state/actions';
import {
    attackedCitySelector,
} from '../../state/selectors';
import type { ClientState } from '../../state/modules/root';
import { attackedCityIdSelector } from '../../state/modules/menu/selectors';
import { closeAttackView } from '../../state/modules/menu/actions';

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

const mapStateToProps = (state: ClientState): StateProps => {
    return Object.freeze({
        city: attackedCitySelector(state),
        cityId: attackedCityIdSelector(state),
    });
};

const actionCreators: DispatchProps = Object.freeze({
    closeAttackView,
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