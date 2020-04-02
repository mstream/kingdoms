// @flow

import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import type { ClientAction, ClientState } from '../../../../state/types';
import { clientStateSelectors } from '../../../../state/modules/selectors';
import type { ScheduledAttackOrderInfo } from '../../../../state/modules/selectors/types';
import type { CommonStateCities } from '../../../../../../common/src/state/modules/cities/reducer/types';
import type { CommonStateRegimentTemplate } from '../../../../../../common/src/state/modules/orders/reducer/types';

type OwnProps = $ReadOnly<{|
    regimentTemplate: CommonStateRegimentTemplate,
|}>;

type StateProps = $ReadOnly<{||}>;

type DispatchProps = $ReadOnly<{||}>;

export type Props = {|
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
|};

const mapStateToProps = (state: ClientState): StateProps => {
    return Object.freeze({});
};

const actionCreators: DispatchProps = Object.freeze({});

export const connectProps = connect<
    Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>,
>(
    mapStateToProps,
    // $FlowFixMe
    actionCreators,
);
