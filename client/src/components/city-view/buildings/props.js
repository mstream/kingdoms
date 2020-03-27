// @flow


import type { ActionCreatorsProps, StateToProps } from '../../types';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { clientStateSelectors } from '../../../state/modules/selectors';
import { TAB_BUILDINGS } from '../../../state/modules/menu/reducer/types';
import { requestBuildingUpgrade } from '../../../state/modules/common-state/actions';
import { selectCityViewBuildingsTab } from '../../../state/modules/menu/actions';
import type { ClientState } from '../../../state/modules/types';
import type { ClientAction } from '../../../state/types';
import { clientStateMenuSelectors } from '../../../state/modules/menu/selectors';
import { clientStateCommonStateSelectors } from '../../../state/modules/common-state/selectors';

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
    requestBuildingUpgrade,
    selectCityViewBuildingsTab,
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