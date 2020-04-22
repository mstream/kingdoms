// @flow

export type ElementsIndex<K:string, V> = $ReadOnly< { [K]: V } >;

export type ElementIds<K: string> = ElementsIndex< K, string >;

