// @flow

type LogOptions = $ReadOnly< {|
    interpolationValues?: $ReadOnlyArray< mixed >,
    message: string,
|} >;

type LogErrorOptions = $ReadOnly< {|
    ...LogOptions,
    error?: Error,
|} >;

export type Log = (
    LogOptions
) => void;

export type LogError = (
    LogErrorOptions
) => void;

export type Logger = $ReadOnly< {|
    debug: Log,
    error: LogError,
    info: Log,
    warn: Log,
|} >;
