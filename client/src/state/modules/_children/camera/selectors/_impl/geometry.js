// @flow


import type { Geometry } from '../../../../../../../../common/src/geometry';
import type { ClientStateSelector } from '../../../../../types';

export const geometrySelector: ClientStateSelector<Geometry> = (state) => {
    return state.camera.geometry;
};
