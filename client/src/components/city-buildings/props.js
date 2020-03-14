// @flow

import type { ActionCreatorsProps, StateToProps } from '../types';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import type { ClientAction } from '../../state/actions';
import {
    activeCityTabSelector,
    currentlyViewedCitySelector,
    rulesSelector,
} from '../../state/selectors';
import { TAB_BUILDINGS } from '../../state/modules/menu/reducer/types';
import type { ClientState } from '../../state/modules/root';
import { currentlyViewedCityIdSelector } from '../../state/modules/menu/selectors';
import { requestBuildingUpgrade } from '../../state/modules/common-state/actions';

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
        city: currentlyViewedCitySelector(state),
        cityId: currentlyViewedCityIdSelector(state),
        isVisible: activeCityTabSelector(state) === TAB_BUILDINGS,
        rules: rulesSelector(state),
    });
};

const actionCreators: DispatchProps = Object.freeze({
    requestBuildingUpgrade,
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