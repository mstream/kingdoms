// @flow


import type { ActionCreatorsProps, StateToProps } from '../../types';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { TAB_UNITS } from '../../../state/modules/menu/reducer/types';
import { selectCityViewUnitsTab } from '../../../state/modules/menu/actions';
import type { ClientState } from '../../../state/modules/types';
import type { ClientAction } from '../../../state/types';
import { clientStateMenuSelectors } from '../../../state/modules/menu/selectors';
import { clientStateCommonStateSelectors } from '../../../state/modules/common-state/selectors';
import { clientStateSelectors } from '../../../state/modules/selectors';

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
        activeUnit: clientStateMenuSelectors.activeCityViewUnit(state),
        city: clientStateSelectors.currentlyViewedCity(state),
        isVisible: clientStateMenuSelectors.activeCityViewTab(state) === TAB_UNITS,
        rules: clientStateCommonStateSelectors.rules(state),
        unitStats: clientStateCommonStateSelectors.unitStats(state),
    });
};

const actionCreators: DispatchProps = Object.freeze({
    selectCityViewUnitsTab,
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
