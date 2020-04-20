// @flow

type CallsiteRecord = $ReadOnly< {|
    callsiteFrameIdx: number,
    filename: string,
    isV8Frames: boolean,
    lineNum: number,
    stackFrames: $ReadOnlyArray< mixed >,
|} >;

export type TestCafeError = $ReadOnly< {|
    callsite: CallsiteRecord,
    code: string,
    isTestCafeError: true,
    apiFnChain: $ReadOnlyArray< string >,
    apiFnIndex: number,
|} >;
