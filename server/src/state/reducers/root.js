/**
 * @flow
 */

import reduceReducers from 'reduce-reducers';
import {citiesReducer} from './cities';
import {timeReducer} from './time';

export const rootReducer = reduceReducers(citiesReducer, timeReducer);

