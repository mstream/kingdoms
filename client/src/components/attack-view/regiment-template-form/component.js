// @flow

import React from 'react';
import type { Props } from './props';
import { unitsOrder, unitVisuals } from '../../../assets/images/units';
import { numberToQuantityString } from '../../../../../common/src/util';
import { ImageComponent } from '../../image';
import type { CommonStateUnit } from '../../../../../common/src/state';
import {
    CommonStateUnitType,
    UNIT_PEASANT,
} from '../../../../../common/src/state';

type BoundaryType = 'from' | 'to';

const serializeInputName = (
    {
        boundaryType,
        unitType,
    }: {
        boundaryType: BoundaryType,
        unitType: CommonStateUnit
    },
): string => {
    return `${unitType}-${boundaryType}`;
};

const deserializeInputName = (
    {
        inputName,
    }: {
        inputName: string
    },
): { boundaryType: BoundaryType, unitType: CommonStateUnit } => {
    const [unitType, boundaryType] = inputName.split('-');

    if (boundaryType !== 'from' && boundaryType !== 'to') {
        throw Error(`unsupported boundary type: ${boundaryType}`);
    }

    return {
        boundaryType,
        unitType: CommonStateUnitType.assert(unitType),
    };
};

export const testId = 'attack-view-regiment-template-form';

export const Component = (
    {
        attackingCity,
        regimentTemplate,
        setRegimentTemplate,
    }: Props,
) => {
    if (attackingCity == null) {
        return null;
    }

    const onChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const { boundaryType, unitType } = deserializeInputName({ inputName: name });

        try {
            setRegimentTemplate(
                {
                    ...regimentTemplate,
                    // $FlowFixMe
                    [unitType]: {
                        ...regimentTemplate[unitType],
                        // $FlowFixMe
                        [boundaryType]: parseInt(value),
                    },
                },
            );
        } catch (error) {
            // do nothing on number parsing error
        }
    };

    const onBlur = (event: SyntheticInputEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const { boundaryType, unitType } = deserializeInputName({ inputName: name });
        const previousRange = regimentTemplate[unitType];

        const calculateNewRange = (): Range => {
            const parsedValue = parseInt(value);
            if (boundaryType === 'from') {
                const toValue = regimentTemplate[unitType].to;
                const newFromValue = parsedValue;
                const newToValue = newFromValue > toValue ? newFromValue : toValue;
                return {
                    ...previousRange,
                    from: newFromValue,
                    to: newToValue,
                };
            }
            if (boundaryType === 'to') {
                const fromValue = regimentTemplate[unitType].from;
                const newToValue = parsedValue;
                const newFromValue = newToValue < fromValue ? newToValue : fromValue;
                return {
                    ...previousRange,
                    from: newFromValue,
                    to: newToValue,
                };
            }
            throw Error(`unsupported boundary type: ${boundaryType}`);
        };

        const newRange = calculateNewRange();

        setRegimentTemplate(
            {
                ...regimentTemplate,
                // $FlowFixMe
                [unitType]: newRange,
            },
        );
    };

    const unitRows = unitsOrder.map(unitType => {

        if (unitType === UNIT_PEASANT) {
            return null;
        }

        const unitQuantity = attackingCity.units[unitType];
        const unitVisual = unitVisuals[unitType];

        const inputClassName = 'm-1 text-xl cursor-text text-center bg-gray-900 border border-gray-100';

        return (
            <div key={unitType} className="flex flex-row flex-1 p-1">
                <div className="h-10 w-10 m-1">
                    <p className="text-sm text-center font-medium">
                        {numberToQuantityString({ value: unitQuantity })}
                    </p>
                    <ImageComponent
                        image={unitVisual.image}
                        ratio="100%"
                    />
                    <p className="text-xs text-center">{unitVisual.name}</p>
                </div>
                <div className="flex flex-col m-1">
                    <div className="flex flex-row items-center justify-end">
                        <label>from</label>
                        <input
                            name={serializeInputName({
                                boundaryType: 'from',
                                unitType,
                            })}
                            type="number"
                            min="0"
                            max="9999"
                            maxLength="4"
                            value={regimentTemplate[unitType].from}
                            className={inputClassName}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                    </div>
                    <div className="flex flex-row items-center justify-end">
                        <label>to</label>
                        <input
                            name={serializeInputName({
                                boundaryType: 'to',
                                unitType,
                            })}
                            type="number"
                            min="0"
                            max="9999"
                            maxLength="4"
                            value={regimentTemplate[unitType].to}
                            className={inputClassName}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div
            data-testid={testId}
            className="flex flex-col items-center justify-start shadow-inner">
            {unitRows}
        </div>
    );
};
