// @flow


import type { ActionCreatorsProps, StateToProps } from '../../types';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { clientStateSelectors } from '../../../state/modules/selectors';
import { TAB_BUILDINGS } from '../../../state/modules/_children/menu/reducer/types';
import type { ClientAction, ClientState } from '../../../state/types';
import { clientStateMenuSelectors } from '../../../state/modules/_children/menu/selectors';
import { clientStateCommonStateSelectors } from '../../../state/modules/_children/common-state/selectors';
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
        activeBuilding: clientStateMenuSelectors.activeCityViewBuilding(state),
        city: clientStateSelectors.currentlyViewedCity(state),
        cityId: clientStateMenuSelectors.currentlyViewedCityId(state),
        isVisible: clientStateMenuSelectors.activeCityViewTab(state) === TAB_BUILDINGS,
        rules: clientStateCommonStateSelectors.rules(state),
    });
};

const actionCreators: DispatchProps = Object.freeze({
    requestBuildingUpgrade: clientActions.commonState.requestBuildingUpgrade,
    selectCityViewBuildingsTab: clientActions.menu.selectCityViewBuildingsTab,
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