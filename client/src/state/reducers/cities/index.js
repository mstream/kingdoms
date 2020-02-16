/**
 * @flow
 */
import type { ClientStateEntity } from '../root';
import type { Geometry, ResourceType } from '../../../../../common/src/types';
import { citiesByOwnerIdReducer } from './by-owner-id';
import { citiesByIdReducer } from './by-id';
import type { Reducer } from 'redux';
import reduceReducers from 'reduce-reducers';
import type { ClientAction } from '../../actions';

export type ClientStateCitiesById = { [string]: ClientStateCity };

export type ClientStateCitiesByOwnerId = { [string]: $ReadOnlyArray<string> };

export type ClientStateResource = {
    type: ResourceType,
    quantity: number,
};

export type ClientStateCity = ClientStateEntity & {
    geometry: Geometry,
    name: string,
    ownerId: string,
    resources: $ReadOnlyArray<ClientStateResource>,
    ...
};

export type ClientStateCities = {
    byId: ClientStateCitiesById,
    byOwnerId: ClientStateCitiesByOwnerId,
};

export const citiesReducer: Reducer<
    ClientStateCities,
    ClientAction
> = reduceReducers(citiesByIdReducer, citiesByOwnerIdReducer);
