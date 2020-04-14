// @flow

import React from 'react';
import type {
    Props,
} from './props';
import {
    unitVisuals, unitsOrder,
} from '../../../assets/images/units';
import {
    numberToQuantityString,
} from '../../../../../common/src/utils';
import {
    ImageComponent,
} from '../../image';
import type {
    CommonStateUnitKey,
} from '../../../../../common/src/state/modules/rules/reducer/types';
import {
    UNIT_PEASANT,
} from '../../../../../common/src/state/modules/rules/reducer/types';
import {
    validateUnitType,
} from '../../../../../common/src/validators';

type BoundaryType = 'from' | 'to';

const serializeInputName = (
    {
        boundaryType,
        unitType,
    }: {
    boundaryType: BoundaryType,
    unitType: CommonStateUnitKey,
},
): string => {

    return `${ unitType }-${ boundaryType }`;

};

const deserializeInputName = (
    {
        inputName,
    }: {
    inputName: string,
},
): { boundaryType: BoundaryType, unitType: CommonStateUnitKey } => {

    const [
        unitType,
        boundaryType,
    ] = inputName.split(
        `-`,
    );

    if ( boundaryType !== `from` && boundaryType !== `to` ) {

        throw Error(
            `unsupported boundary type: ${ boundaryType }`,
        );

    }

    return {
        boundaryType,
        unitType: validateUnitType(
            {
                toValidate: unitType,
            },
        ),
    };

};

export const testId = `attack-view-regiment-template-form`;

export const Component = (
    {
        attackingCity,
        regimentTemplate,
        updateAttackViewRegimentTemplate,
    }: Props,
) => {

    if ( attackingCity == null ) {

        return null;

    }

    const onChange = (
        event: SyntheticInputEvent< HTMLInputElement >,
    ) => {

        const {
            name, value,
        } = event.target;

        const {
            boundaryType, unitType,
        } = deserializeInputName(
            {
                inputName: name,
            },
        );

        try {

            const newTemplateDraft = {
                ...regimentTemplate,

                // $FlowFixMe
                [ unitType ]: {
                    ...regimentTemplate[ unitType ],

                    // $FlowFixMe
                    [ boundaryType ]: parseInt(
                        value,
                    ),
                },
            };

            const calculateNewRange = (): Range => {

                const previousRange = newTemplateDraft[ unitType ];
                const parsedValue = parseInt(
                    value,
                );

                if ( boundaryType === `from` ) {

                    const toValue = newTemplateDraft[ unitType ].to;
                    const newFromValue = parsedValue;
                    const newToValue
                        = newFromValue > toValue
                            ? newFromValue
                            : toValue;
                    return {
                        ...previousRange,
                        from: newFromValue,
                        to  : newToValue,
                    };

                }

                if ( boundaryType === `to` ) {

                    const fromValue = newTemplateDraft[ unitType ].from;
                    const newToValue = parsedValue;
                    const newFromValue
                        = newToValue < fromValue
                            ? newToValue
                            : fromValue;
                    return {
                        ...previousRange,
                        from: newFromValue,
                        to  : newToValue,
                    };

                }
                throw Error(
                    `unsupported boundary type: ${ boundaryType }`,
                );

            };

            const newRange = calculateNewRange();

            const newTemplate = {
                ...regimentTemplate,

                // $FlowFixMe
                [ unitType ]: newRange,
            };

            updateAttackViewRegimentTemplate(
                {
                    regimentTemplate: newTemplate,
                },
            );

        } catch ( error ) {
            // Do nothing on number parsing error
        }

    };

    const unitRows = unitsOrder.map(
        (
            unitType,
        ) => {

            if ( unitType === UNIT_PEASANT ) {

                return null;

            }

            const unitQuantity = attackingCity.units[ unitType ];
            const unitVisual = unitVisuals[ unitType ];

            const inputClassName
            = `m-1 text-xl cursor-text text-center bg-gray-900 border border-gray-100`;

            return (
                <div key={unitType} className="flex flex-row flex-1 p-1 my-1 mx-2">
                    <div className="m-1">
                        <p className="text-sm text-center font-medium">
                            {numberToQuantityString(
                                {
                                    value: unitQuantity,
                                },
                            )}
                        </p>
                        <ImageComponent image={unitVisual.image} ratio="100%"/>
                        <p className="text-xs text-center">{unitVisual.name}</p>
                    </div>
                    <div className="flex flex-col m-1">
                        <div className="flex flex-row items-center justify-end">
                            <label>from</label>
                            <input
                                name={serializeInputName(
                                    {
                                        boundaryType: `from`,
                                        unitType,
                                    },
                                )}
                                type="number"
                                min="0"
                                max="9999"
                                maxLength="4"
                                value={regimentTemplate[ unitType ].from}
                                className={inputClassName}
                                onChange={onChange}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-end">
                            <label>to</label>
                            <input
                                name={serializeInputName(
                                    {
                                        boundaryType: `to`,
                                        unitType,
                                    },
                                )}
                                type="number"
                                min="0"
                                max="9999"
                                maxLength="4"
                                value={regimentTemplate[ unitType ].to}
                                className={inputClassName}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                </div>
            );

        },
    );

    return (
        <div data-testid={testId} className="flex flex-col">
            <div className="flex flex-row justify-center text-xl">Regiment</div>
            <div className="flex flex-row flex-wrap justify-start shadow-inner">
                {unitRows}
            </div>
        </div>
    );

};
