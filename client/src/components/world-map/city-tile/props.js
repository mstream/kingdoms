// @flow

import {
    clientActions,
} from '../../../pages/world/state/modules/actions';
import {
    clientStateSelectors,
} from '../../../pages/world/state/modules/selectors';
import {
    connect,
} from 'react-redux';
import type {
    ActionCreatorsProps, StateToProps,
} from '../../types';
import type {
    ClientAction, ClientState,
} from '../../../pages/world/state/types';
import type {
    ClientStateTile,
} from '../../../pages/world/state/modules/_children/tiles/reducer/types';
import type {
    CommonStateCity,
} from '../../../../../common/src/state/modules/_children/cities/reducer/types';
import type {
    Dispatch,
} from 'redux';

type OwnProps = {
    city: CommonStateCity,
    cityTile: ClientStateTile,
    cityId: string,
};

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
            playerName: clientStateSelectors.player.name(
                state,
            ),
        },
    );

};

const actionCreators: DispatchProps = Object.freeze(
    {
        openAttackView: clientActions.menu.openAttackView,
        openCityView  : clientActions.menu.openCityView,
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
