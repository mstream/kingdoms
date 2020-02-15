/**
 * @flow
 */
import type {Reducer} from 'redux';
import type {Action} from '../../types';
import type {ClientStateCity} from '../types';
import {multipleVectors} from '../../../../common/src/vector';
import {tileSize} from './root';
import {EMPTY_OBJECT} from '../../../../common/src/util';

const initialState: { [string]: ClientStateCity } = EMPTY_OBJECT;

export const citiesReducer: Reducer<{ [string]: ClientStateCity }, Action> = (state = initialState, action) => {
    switch (action.type) {
        case 'SERVER_STATE_UPDATED': {
            return action.payload.cities.reduce((citiesById, city) => {

                    const clientStateCity: ClientStateCity = {
                        id: city.id,
                        name: city.name,
                        geometry: {
                            location: multipleVectors({
                                vector1: city.location,
                                vector2: tileSize
                            }),
                            size: tileSize
                        },
                        resources: city.resources
                    };

                    return {
                        ...citiesById,
                        [city.id]: clientStateCity
                    };
                },
                EMPTY_OBJECT
            );
        }
        default: {
            return state;
        }
    }
};
