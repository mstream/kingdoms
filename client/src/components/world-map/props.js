// @flow

import type { ActionCreatorsProps, StateToProps } from '../types';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import type { ClientAction } from '../../state/actions';
import {
    moveCameraDown,
    moveCameraLeft,
    moveCameraRight,
    moveCameraUp,
    zoomCameraIn,
    zoomCameraOut,
} from '../../state/actions';
import {
    citiesSelector,
} from '../../state/selectors';
import type { Vector } from '../../../../common/src/vector';
import type { ClientState } from '../../state/modules/root';
import { tilesSelector } from '../../state/modules/tiles/selectors';
import { cameraSelector } from '../../state/modules/camera/selectors';

type OwnProps = {
    windowSize: Vector,
};

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
        camera: cameraSelector(state),
        cities: citiesSelector(state),
        tiles: tilesSelector(state),
    });
};

const actionCreators: DispatchProps = Object.freeze({
    moveCameraUp,
    moveCameraDown,
    moveCameraLeft,
    moveCameraRight,
    zoomCameraIn,
    zoomCameraOut,
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
