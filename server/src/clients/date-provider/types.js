// @flow

export type GetCurrentArgs = [];
export type GetCurrentResult = Date;

type GetCurrent = ( ...GetCurrentArgs ) => GetCurrentResult;
export type MockGetCurrent = JestMockFn< GetCurrentArgs, GetCurrentResult >;


export type DateProvider = {
    getCurrent: GetCurrent,
};
