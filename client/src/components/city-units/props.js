// @flow

import type { ClientState } from '../../state/state';
import { TAB_UNITS } from '../../state/state';
import type { ActionCreatorsProps, StateToProps } from '../types';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import type { ClientAction } from '../../state/actions';
import { selectCityViewUnit } from '../../state/actions';
import {
    activeCityTabSelector,
    activeUnitSelector,
    currentlyViewedCitySelector,
    rulesSelector,
    unitStatsSelector,
} from '../../state/selectors';

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
        activeUnit: activeUnitSelector(state),
        city: currentlyViewedCitySelector(state),
        isVisible: activeCityTabSelector(state) === TAB_UNITS,
        rules: rulesSelector(state),
        unitStats: unitStatsSelector(state),
    });
};

const actionCreators: DispatchProps = Object.freeze({
    selectCityViewUnit,
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
