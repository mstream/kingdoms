// @flow


import type { ActionCreatorsProps, StateToProps } from '../../types';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { TAB_RESOURCES } from '../../../state/modules/_children/menu/reducer/types';
import type { ClientAction, ClientState } from '../../../state/types';
import { clientStateCommonStateSelectors } from '../../../state/modules/_children/common-state/selectors';
import { clientStateMenuSelectors } from '../../../state/modules/_children/menu/selectors';
import { clientStateSelectors } from '../../../state/modules/selectors';
import { clientActions } from '../../../state/modules/actions';

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
        activeResource: clientStateSelectors.menu.activeCityViewResource(state),
        city: clientStateSelectors.currentlyViewedCity(state),
        isVisible: clientStateSelectors.menu.activeCityViewTab(state) === TAB_RESOURCES,
        rules: clientStateSelectors.commonState.rules(state),
    });
};

const actionCreators: DispatchProps = Object.freeze({
    selectCityViewResourcesTab: clientActions.menu.selectCityViewResourcesTab,
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