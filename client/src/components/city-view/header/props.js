// @flow


import type { ActionCreatorsProps, StateToProps } from '../../types';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { clientStateSelectors } from '../../../state/modules/selectors';
import { openCityView } from '../../../state/modules/menu/actions';
import { requestCityNameChange } from '../../../state/modules/common-state/actions';
import type { ClientState } from '../../../state/modules/types';
import type { ClientAction } from '../../../state/types';
import { clientStateMenuSelectors } from '../../../state/modules/menu/selectors';

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
        cityId: clientStateMenuSelectors.currentlyViewedCityId(state),
        nextCityId: clientStateSelectors.nextCityId(state),
        previousCityId: clientStateSelectors.previousCityId(state),
    });
};

const actionCreators: DispatchProps = Object.freeze({
    openCityView,
    requestCityNameChange,
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