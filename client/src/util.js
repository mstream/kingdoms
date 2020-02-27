/**
 * @flow
 */

import type {GeometryStyle} from './types';
import type {Geometry} from '../../common/src/geometry';

const suffixes = [
    'k',
    'm',
    'b',
    't'
];

export const createGeometryStyle = ({
                                        geometry,
                                    }: {
    geometry: Geometry,
}): GeometryStyle => {
    return {
        height: geometry.size.y,
        width: geometry.size.x,
        marginTop: geometry.location.y - geometry.size.y / 2,
        marginLeft: geometry.location.x - geometry.size.x / 2,
    };
};

export const numberToQuantityString = ({value}: { value: number }): string => {
    const quantity = suffixes.reduce(
        (quantity, suffix) => {
            const nextValue = quantity.value / 10000;
            if (nextValue < 1) {
                return quantity;
            }
            return {
                value: nextValue,
                suffix
            };
        },
        {value, suffix: null}
    );
    return `${quantity.value.toString().substring(0, 4)}${quantity.suffix != null ? quantity.suffix : ''}`;
};

export const getRefValue = <T>({ref}: { ref: { current: ?T, ... } }): T => {
    if (ref.current == null) {
        throw Error('ref value not set');
    }
    return ref.current;
};
