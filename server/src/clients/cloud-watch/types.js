// @flow

import type {
    AwsSdkResult,
} from '../types';

type Unit =
    | 'Bits'
    | 'Bits/Second'
    | 'Bytes'
    | 'Bytes/Second'
    | 'Count'
    | 'Count/Second'
    | 'Gigabits'
    | 'Gigabits/Second'
    | 'Gigabytes'
    | 'Gigabytes/Second'
    | 'Kilobits'
    | 'Kilobits/Second'
    | 'Kilobytes'
    | 'Kilobytes/Second'
    | 'Megabits'
    | 'Megabits/Second'
    | 'Megabytes'
    | 'Megabytes/Second'
    | 'Microseconds'
    | 'Milliseconds'
    | 'None'
    | 'Percent'
    | 'Seconds'
    | 'Terabits'
    | 'Terabits/Second'
    | 'Terabytes'
    | 'Terabytes/Second';

export type Dimension = $ReadOnly< {|
    Name: string,
    Value: string,
|} >;

export type MetricDataItem = $ReadOnly< {|
    Dimensions: $ReadOnlyArray< Dimension >,
    MetricName: string,
    Unit: Unit,
    Value: number,
|} >;

export type MetricData = $ReadOnlyArray< MetricDataItem >

export type PutMetricDataArgs = [
    $ReadOnly< {|
        MetricData: MetricData,
        Namespace: string,
    |} >
];

export type PutMetricDataResult = AwsSdkResult< void >

type PutMetricData = ( ...PutMetricDataArgs ) => PutMetricDataResult;
export type MockPutMetricData = JestMockFn< PutMetricDataArgs, PutMetricDataResult >;

export type CloudWatch = {
    putMetricData: PutMetricData,
};
