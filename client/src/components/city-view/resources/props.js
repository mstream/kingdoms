// @flow

import {
    TAB_RESOURCES,
} from '../../../state/modules/_children/menu/reducer/types';
import {
    clientActions,
} from '../../../state/modules/actions';
import {
    clientStateSelectors,
} from '../../../state/modules/selectors';
import {
    connect,
} from 'react-redux';
import type {
    ActionCreatorsProps, StateToProps,
} from '../../types';
import type {
    ClientAction, ClientState,
} from '../../../state/types';
import type {
    Dispatch,
} from 'redux';

type OwnProps = {};

type StateProps = $ReadOnly< {
    ...StateToProps< typeof mapStateToProps >,
} >;

type DispatchProps = $ReadOnly< {
    ...ActionCreatorsProps< typeof actionCreators >,
} >;

export type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const mapStateToProps = (
    state: ClientState,
) => {

    return Object.freeze(
        {
            activeResource: clientStateSelectors.menu.activeCityViewResource(
                state,
            ),
            city: clientStateSelectors.currentlyViewedCity(
                state,
            ),
            isVisible:
            clientStateSelectors.menu.activeCityViewTab(
                state,
            )
            === TAB_RESOURCES,
            rules: clientStateSelectors.commonState.rules(
                state,
            ),
        },
    );

};

const actionCreators: DispatchProps = Object.freeze(
    {
        selectCityViewResourcesTab: clientActions.menu.selectCityViewResourcesTab,
    },
);

export const connectProps = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch< ClientAction >,
    >(
        mapStateToProps,
        actionCreators,
    );
