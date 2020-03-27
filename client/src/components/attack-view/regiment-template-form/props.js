// @flow


import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { clientStateSelectors } from '../../../state/modules/selectors';
import type { ActionCreatorsProps, StateToProps } from '../../types';
import type { ClientState } from '../../../state/modules/types';
import type { ClientAction } from '../../../state/types';
import { updateAttackViewRegimentTemplate } from '../../../state/modules/menu/actions';
import { clientStateMenuSelectors } from '../../../state/modules/menu/selectors';

type OwnProps = {
    onQuantityChange: (SyntheticInputEvent<HTMLInputElement>) => void,
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
        attackingCity: clientStateSelectors.attackingCity(state),
        regimentTemplate: clientStateMenuSelectors.regimentTemplate(state),
    });
};

const actionCreators: DispatchProps = Object.freeze({
    updateAttackViewRegimentTemplate,
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