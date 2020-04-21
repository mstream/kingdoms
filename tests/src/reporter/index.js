const verror = require(
    `verror`,
);

const decorators = require(
    `./decorators`,
);
const reportTaskDone = require(
    `./report-task-done`,
);

const reportTestDone = require(
    `./report-test-done`,
);

const testMode = process.env.TEST_MODE;

const selectDecorator = (
    {
        testRunInfo,
    },
) => {

    const isError = testRunInfo.errs.length > 0;
    const isUnstable = !isError && testRunInfo.unstable;
    const isSuccess = !isError && !isUnstable;

    if ( isError ) {

        return decorators.decorateErrorOutput;

    }

    if ( isSuccess ) {

        return decorators.decorateSuccessOutput;

    }

    if ( isUnstable ) {

        return decorators.decorateUnstableOutput;

    }

    throw Error(
        `cannot determine appropriate decorator`,
    );

};

module.exports = () => {

    return {
        async reportFixtureStart () {
        },
        async reportTaskDone () {

            if ( testMode === `retest` ) {

                return;

            }

            const dir = `tests/dist/${ process.env.NODE_ENV }`;

            reportTaskDone.saveFailedTestsMeta(
                {
                    dir,
                    failedTests: this.failedTests,
                },
            );

        },
        async reportTaskStart () {

            if ( testMode === `test` ) {

                this.write(
                    `TESTING...`,
                );

                this.newline();
                return;

            }

            if ( testMode === `retest` ) {

                this.write(
                    `RE-TESTING...`,
                );

                this.newline();
                return;

            }

            throw new verror.VError(
                {
                    name: `UI_TEST`,
                },
                `invalid test mode: ${ testMode }`,
            );

        },
        async reportTestDone (
            name, testRunInfo, meta,
        ) {

            try {

                if ( testRunInfo.errs.length > 0 ) {

                    this.failedTests = this.failedTests == null
                        ? [
                            name,
                        ]
                        : [
                            ...this.failedTests,
                            name,
                        ];

                }

                const decorator = selectDecorator(
                    {
                        testRunInfo,
                    },
                );

                const errorInfos = testRunInfo.errs.map(
                    (
                        err,
                    ) => {

                        return {
                            context: err.context == null
                                ? {
                                }
                                : err.context,
                            formattedError: this.formatError(
                                err,
                            ),
                        };

                    },
                );

                const output = reportTestDone.createReport(
                    {
                        errorInfos,
                        meta,
                        name,
                    },
                );

                const decoratedContent = decorator(
                    {
                        output,
                        width: this.viewportWidth,
                    },
                );

                decoratedContent.forEach(
                    (
                        line,
                    ) => {

                        this.write(
                            line,
                        );

                        this.newline();

                    },
                );

            } catch ( error ) {

                console.error(
                    error.stack,
                );

            }

        },
        async reportTestStart () {
        },
    };

};
