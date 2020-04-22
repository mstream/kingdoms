const fs = require(
    `fs`,
);

const createResultsSegment = (
    {
        result,
    },
) => {

    const {
        failedCount, passedCount, skippedCount,
    } = result;

    const resultLines = [
        `  passed: ${ passedCount }`,
        `  skipped: ${ skippedCount }`,
        `  failed: ${ failedCount }`,
    ];

    return [
        `Results`,
        ...resultLines,
    ];

};

const createReport = (
    {
        result,
    },
) => {


    return [
        ...createResultsSegment(
            {
                result,
            },
        ),
    ];

};

const saveFailedTestsMeta = (
    {
        dir,
        failedTests,
    },
) => {

    if ( failedTests == null ) {

        return;

    }

    const failedTestsStr = failedTests
        .map(
            (
                name,
            ) => {

                return `${ name }\n`;

            },
        )
        .join(
            ``,
        );


    fs.mkdirSync(
        dir,
        {
            recursive: true,
        },
    );

    fs.writeFileSync(
        `${ dir }/failed-tests.txt`,
        failedTestsStr,
    );

};

module.exports = {
    createReport,
    saveFailedTestsMeta,
};
