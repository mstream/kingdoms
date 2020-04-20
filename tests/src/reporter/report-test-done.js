const createExecutionPathSegment = (
    {
        name,
    },
) => {

    const timeline = name
        .split(
            `|`,
        )
        .map(
            (
                pathSegment,
            ) => {

                return `  ┣ ${pathSegment}`;

            },
        );

    return [
        `Execution path`,
        `  ┳`,
        ...timeline,
        `  ▼`,
    ];

};

const createTagsSegment = (
    {
        meta,
    },
) => {

    const tags = Object
        .keys(
            meta,
        )
        .sort()
        .map(
            (
                tag,
            ) => {

                return `  • ${tag}`;

            },
        );

    return [
        `Tags`,
        ...tags,
    ];

};

const createErrorSegment = (
    {
        errorInfo, index,
    },
) => {

    const errorLines = errorInfo.formattedError
        .split(
            `\n`,
        )
        .map(
            (
                line,
            ) => {

                return `  ${line}`;

            },
        );

    if (errorInfo.context == null) {
        console.error('!!!' + JSON.stringify(errorInfo));
    }

    const contextLines = Object
        .keys(
            errorInfo.context,
        )
        .map(
            (
                key,
            ) => {

                const value = errorInfo.context[key];
                return `  ${key}: ${value}`;

            },
        );

    return [
        `Error ${index + 1}`,
        ...errorLines,
        `Context`,
        ...contextLines,
    ];

};


const createReport = (
    {
        errorInfos, meta, name,
    },
) => {

    const executionPathSegment = createExecutionPathSegment(
        {
            name,
        },
    );
    const tagsSegment = createTagsSegment(
        {
            meta,
        },
    );

    const testInfoSegment = [
        ...executionPathSegment,
        null,
        ...tagsSegment,
    ];

    if (errorInfos.length === 0) {

        return testInfoSegment;

    }

    const errorsSegments = errorInfos.map(
        (
            errorInfo, index,
        ) => {

            return createErrorSegment(
                {
                    errorInfo,
                    index,
                },
            );

        },
    );

    const errorsSegment = errorsSegments.reduce(
        (
            errorsSegment, segment,
        ) => {

            return [
                ...errorsSegment,
                null,
                ...segment,
            ];

        },
        [],
    );

    return [
        ...testInfoSegment,
        ...errorsSegment,
    ];

};

module.exports = {
    createReport,
};
