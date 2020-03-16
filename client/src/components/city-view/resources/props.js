// @flow

import type { ActionCreatorsProps, StateToProps } from '../../types';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import type { ClientAction } from '../../../state/actions';
import {
    activeCityTabSelector,
    activeResourceSelector,
    currentlyViewedCitySelector,
    rulesSelector,
} from '../../../state/selectors';
import { TAB_RESOURCES } from '../../../state/modules/menu/reducer/types';
import type { ClientState } from '../../../state/modules/root';
import { selectCityViewResourcesTab } from '../../../state/modules/menu/actions';

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
        activeResource: activeResourceSelector(state),
        city: currentlyViewedCitySelector(state),
        isVisible: activeCityTabSelector(state) === TAB_RESOURCES,
        rules: rulesSelector(state),
    });
};

const actionCreators: DispatchProps = Object.freeze({
    selectCityViewResourcesTab,
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