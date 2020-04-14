// @flow

export type Exec = ( string ) => Promise< $ReadOnly< {| stderr: string, stdout: string |} > >
