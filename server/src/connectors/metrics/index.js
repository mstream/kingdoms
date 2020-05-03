// @flow


import type {
    CloudWatch,
    Dimension,
    MetricDataItem,
} from '../../clients/cloud-watch/types';
import type {
    Config,
} from '../../config/types';
import type {
    Logger,
} from '../../../../common/src/logging/types';

export const createMetricsConnector = (
    {
        config,
    }: { config: Config },
) => {

    const defaultDimensions: $ReadOnlyArray< Dimension >
        = [
            {
                Name : `Environment`,
                Value: config.environment,
            },
        ];

    const decoratedSendMetric = async (
        {
            cloudWatch,
            data,
            group,
            logger
            ,
        }: {
            cloudWatch: CloudWatch,
            data: MetricDataItem,
            group: string,
            logger: Logger,
        },
    ): Promise< void > => {

        const decoratedMetricDataItem: MetricDataItem = {
            ...data,
            Dimensions: [
                ...defaultDimensions,
                ...data.Dimensions,
            ],
        };

        const decoratedMetric = {
            MetricData: [
                decoratedMetricDataItem,
            ],
            Namespace: `Kingdoms/${ group }`,
        };

        logger.debug(
            {
                interpolationValues: [
                    decoratedMetric,
                ],
                message: `emitting a metric: %o`,
            },
        );

        return await cloudWatch.putMetricData(
            decoratedMetric,
        )
            .promise();

    };

    return {
        sendMetric: decoratedSendMetric,
    };

};
