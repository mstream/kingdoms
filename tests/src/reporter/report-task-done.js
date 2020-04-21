const fs = require(
    `fs`,
);

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
    saveFailedTestsMeta,
};
