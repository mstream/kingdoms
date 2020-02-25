/**
 * @flow
 */

import type {ServerState} from '../../../../common/src/state';
import type {ServerChangeCityNameAction} from '../../../../common/src/actions';

export const validateChangeCityNameAction = ({action, state}: { action: ServerChangeCityNameAction, state: ServerState }): $ReadOnlyArray<string> => {
    const {cityId, name, playerId} = action.payload;
    const city = state.cities.find(city => city.id === cityId);
    if (city == null) {
        return [`city ${cityId} does not exist`];
    }
    if (playerId !== city.ownerId) {
        return [`city ${cityId} does not belong to player ${playerId}`];
    }
    if (name.length < 3) {
        return ['city name is too short'];
    }
    if (name.length > 20) {
        return ['city name is too long'];
    }
    if (name.match(/^[A-Z][a-z]+$/) == null) {
        return ['city name does not follow the convention'];
    }
    return [];
};