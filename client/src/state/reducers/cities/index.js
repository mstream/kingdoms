// @flow
import {citiesByOwnerIdReducer} from './by-owner-id';
import {citiesByIdReducer} from './by-id';
import type {Reducer} from 'redux';
import reduceReducers from 'reduce-reducers';
import type {ClientAction} from '../../actions';
import type {Geometry} from '../../../../../common/src/geometry';
import type {
    CommonStateBuildings,
    CommonStateCitizens,
    CommonStateResources
} from '../../../../../common/src/state';
import type {Vector} from '../../../../../common/src/vector';

export type ClientStateCitiesById = { [string]: ClientStateCity };

export type ClientStateCitiesByOwnerId = { [string]: $ReadOnlyArray<string> };

export type ClientStateCity = {
    buildings: CommonStateBuildings,
    citizens: CommonStateCitizens,
    geometry: Geometry,
    location: Vector,
    name: string,
    ownerId: ?string,
    resources: CommonStateResources,
    ...
};

export type ClientStateCities = {
    byId: ClientStateCitiesById,
    byOwnerId: ClientStateCitiesByOwnerId,
};

export const citiesReducer: Reducer<ClientStateCities, ClientAction> = reduceReducers(citiesByIdReducer, citiesByOwnerIdReducer);
