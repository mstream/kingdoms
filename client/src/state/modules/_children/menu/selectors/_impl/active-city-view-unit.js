// @flow


import type { CommonStateUnitKey } from '../../../../../../../../common/src/state/modules/rules/reducer/types';
import type { ClientStateSelector } from '../../../../../types';


export const activeCityViewUnitSelector: ClientStateSelector<CommonStateUnitKey> = (state) => {
    return state.menu.cityView.unit;
};