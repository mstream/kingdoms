const config = require(
    `./config`,
);

const decorators = require(
    `./decorators`,
);

const reportTaskStart = require(
    `./report-task-start`,
);

const reportTaskDone = require(
    `./report-task-done`,
);

const reportTestDone = require(
    `./report-test-done`,
);


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
        async reportTaskDone (
            _, __, ___, result,
        ) {

            const output = reportTaskDone.createReport(
                {
                    result,
                },
            );

            const decoratedOutput = decorators.decorateInfoOutput(
                {
                    output,
                    title: `TEST FINISHED`,
                    width: this.viewportWidth,
                },
            );

            decoratedOutput.forEach(
                (
                    line,
                ) => {

                    this.write(
                        line,
                    );

                    this.newline();

                },
            );

            if ( config.testMode === `retest` ) {

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
        async reportTaskStart (
            _, userAgents,
        ) {

            const output = reportTaskStart.createReport(
                {
                    testMode: config.testMode,
                    userAgents,
                },
            );

            const decoratedOutput = decorators.decorateInfoOutput(
                {
                    output,
                    title: `TEST STARTED`,
                    width: this.viewportWidth,
                },
            );

            decoratedOutput.forEach(
                (
                    line,
                ) => {

                    this.write(
                        line,
                    );

                    this.newline();

                },
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

                const decoratedOutput = decorator(
                    {
                        output,
                        width: this.viewportWidth,
                    },
                );

                decoratedOutput.forEach(
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
