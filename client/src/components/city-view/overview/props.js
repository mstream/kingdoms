// @flow


import type { ActionCreatorsProps, StateToProps } from '../../types';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { clientStateSelectors } from '../../../state/modules/selectors';
import { TAB_OVERVIEW } from '../../../state/modules/_children/menu/reducer/types';
import type { ClientAction, ClientState } from '../../../state/types';
import { clientStateMenuSelectors } from '../../../state/modules/_children/menu/selectors';

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
        city: clientStateSelectors.currentlyViewedCity(state),
        isVisible: clientStateSelectors.menu.activeCityViewTab(state) === TAB_OVERVIEW,
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