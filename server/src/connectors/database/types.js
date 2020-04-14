// @flow

import type {
    JestMock,
    MockCalls,
} from '../../../../common/src/test-utils/types';

export type KeyCreator<K> = ( {| key: K |} ) => string;

export type ValueSerializer<V> = ( {| value: V |} ) => string;

export type ValueDeserializer<V> = ( {| serializedValue: string |} ) => V;

export type SideEffect = $ReadOnly< {| calls: MockCalls, mockFunction: JestMock |} >;

export type DatabaseTestScenario<A, R> = $ReadOnly< {|
    name: string,
    create: () => {|
        args: A,
        expectations: {|
            error?: Error,
            result?: R,
            sideEffects: $ReadOnlyArray< SideEffect >
        |},
    |}
|} >;
