/**
 * @flow
 */
import type {ClientStateEntity} from '../root';
import {citiesByOwnerIdReducer} from './by-owner-id';
import {citiesByIdReducer} from './by-id';
import type {Reducer} from 'redux';
import reduceReducers from 'reduce-reducers';
import type {ClientAction} from '../../actions';
import type {Geometry} from '../../../../../common/src/geometry';

export type ClientStateCitiesById = { [string]: ClientStateCity };

export type ClientStateCitiesByOwnerId = { [string]: $ReadOnlyArray<string> };

export type ClientStateResource = {
    quantity: number,
};

export type ClientStateBuilding = {
    tier: number,
};

export type ClientStateCitizen = {
    quantity: number,
};

export type ClientStateBuildings = {
    lumberMill: ClientStateBuilding,
    pasture: ClientStateBuilding
};

export type ClientStateCitizens = {
    peasant: ClientStateCitizen
};

export type ClientStateResources = {
    food: ClientStateResource,
    wood: ClientStateResource
};

export type ClientStateCity = ClientStateEntity & {
    buildings: ClientStateBuildings,
    citizens: ClientStateCitizens,
    geometry: Geometry,
    id: string,
    name: string,
    ownerId: string,
    resources: ClientStateResources,
};

export type ClientStateCities = {
    byId: ClientStateCitiesById,
    byOwnerId: ClientStateCitiesByOwnerId,
};

export const citiesReducer: Reducer<ClientStateCities, ClientAction> = reduceReducers(citiesByIdReducer, citiesByOwnerIdReducer);
