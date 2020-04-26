const verror = require(
    `verror`,
);

const createExecutionPathSegment = (
    {
        path,
    },
) => {

    const timeline = path
        .map(
            (
                pathSegment,
            ) => {

                return `  ┣ ${ pathSegment }`;

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
        tags,
    },
) => {

    const tagLines = Object
        .keys(
            tags,
        )
        .sort()
        .map(
            (
                tag,
            ) => {

                return `  • ${ tag }`;

            },
        );

    return [
        `Tags`,
        ...tagLines,
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

                return `  ${ line }`;

            },
        );

    if ( errorInfo.context == null ) {

        throw new verror.VError(
            {
                name: `UI_TEST`,
            },
            `missing error context`,
        );

    }

    const contextLines = Object
        .keys(
            errorInfo.context,
        )
        .filter(
            (
                key,
            ) => {

                return key !== `destroy`;

            },
        )
        .map(
            (
                key,
            ) => {

                const value = errorInfo.context[ key ];
                return `  ${ key }: ${ value }`;

            },
        );

    return [
        `Error ${ index + 1 }`,
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

    const nameSegment = [
        name,
    ];

    const executionPathSegment = createExecutionPathSegment(
        {
            path: meta.path,
        },
    );

    const tagsSegment = createTagsSegment(
        {
            tags: meta.tags,
        },
    );

    const testInfoSegment = [
        ...nameSegment,
        null,
        ...executionPathSegment,
        null,
        ...tagsSegment,
    ];

    if ( errorInfos.length === 0 ) {

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
