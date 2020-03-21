// @flow

import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { attackingCitySelector } from '../../../state/selectors';
import type { ActionCreatorsProps, StateToProps } from '../../types';
import type { ClientAction } from '../../../state/actions';
import type { ClientState } from '../../../state/modules/types';
import type { CommonStateRegimentTemplate } from '../../../../../common/src/state/modules/orders/reducer/types';

type OwnProps = {
    onQuantityChange: (SyntheticInputEvent<HTMLInputElement>) => void,
    regimentTemplate: CommonStateRegimentTemplate,
    setRegimentTemplate: (CommonStateRegimentTemplate) => void,
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
        attackingCity: attackingCitySelector(state),
    });
};

const actionCreators: DispatchProps = Object.freeze({});

export const connectProps = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    actionCreators,
);