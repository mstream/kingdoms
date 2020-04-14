// @flow

type Log = ( string, ...$ReadOnlyArray< mixed > ) => void

export type Logger = $ReadOnly< {|
    debug: Log,
    error: Log,
    info: Log,
    warn: Log,
|} >;
